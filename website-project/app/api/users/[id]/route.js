import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export async function GET(req, context) {
    await connectToDB();

    const { id } = context.params;

    try {
      const user = await User.findById(id).select('-password');

      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }

      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid ID format' }), { status: 400 });
    }
}
export async function PATCH(req, context) {
  try {
    await connectToDB();

    const { id } = context.params;

    const userData = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { $set: userData }, 
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response('Failed to update user', { status: 500 });
  }
}
