import Stripe from "stripe";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook failed", err.message);
    return new Response(`Webhook Error`, { status: 400});
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await connectToDB();

    try {
      const user = await User.findOne({ email: session.customer_email });
      if (user) {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          { expand: ["data.price.product"] }
        );

        const products = lineItems.data.map((li) => {
            const image = session.metadata.productImage || li.price.product.images?.[0] || "/images/default-product.png";
            return {
              name: li.description,
              image,
              price: li.amount_total / li.quantity / 100,
              quantity: li.quantity,
            };
          });


        user.purchases.push({
            stripePaymentId: session.payment_intent,
            amount: session.amount_total,
            currency: session.currency,
            status: session.payment_status,
            products,
          });

        await user.save();
        console.log("Webhook - Purchase saved:", {
          userId: user._id,
          products: JSON.stringify(products, null, 2),
        });
      }
    } catch (err) {
      console.error("Webhook - Error saving purchase:", err);
      return new Response(`Error saving purchase: ${err.message}`, { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
}

