export default function CancelPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 className="text-red-600">Payment Cancelled!</h1>
      <p>Your payment was cancelled. You can try again anytime.</p>
      <a href="/cart" style={{ color: "blue" }}>Go back to cart</a>
    </div>
  );
}
