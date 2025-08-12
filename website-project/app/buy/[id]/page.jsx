import GiftCardDetails from '@components/GiftCardDetails';

export default async function BuyPage({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/${id}/buy`, { cache: 'no-store' });

  if (!res.ok) {
    return (
      <div className="text-white text-center mt-10">
        <h1>Gift card not found.</h1>
        <a href="/" className="text-lime-400 underline mt-4 block">Back to home</a>
      </div>
    );
  }

  const card = await res.json();

  return <GiftCardDetails card={card} />;
}
