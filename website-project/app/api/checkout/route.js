import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(req) {
  try {
    const { products, email, userId } = await req.json();

    if (!products || !Array.isArray(products) || products.length === 0) {
      return new Response(JSON.stringify({ error: "Products must be a non-empty array" }), { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), { status: 400 });
    }
    if (!userId || typeof userId !== "string") {
      return new Response(JSON.stringify({ error: "Valid userId is required" }), { status: 400 });
    }

    for (const item of products) {
      if (!item.name || !item.price || !item.quantity || !item.image) {
        return new Response(JSON.stringify({ error: "Each product must have name, price, quantity, and image" }), { status: 400 });
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image]
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      customer_email: email,
      metadata: {
        userId,
        productImage: products[0]?.image || "",
      }
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}