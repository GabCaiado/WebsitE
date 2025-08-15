import { giftCards } from '@/data/GiftCards';

export async function GET(request, { params }) {
  const { id } = params;
  const card = giftCards.find(card => card.id.toString() === id);

  if (!card) {
    return new Response(JSON.stringify({ error: 'Gift card not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(card), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
