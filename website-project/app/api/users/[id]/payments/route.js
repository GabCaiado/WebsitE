import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/user";


export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectToDB();

    const user = await User.findById(id).select("purchases");

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const purchases = (user.purchases || []).sort(
      (a, b) => b.createdAt - a.createdAt
    );

    return NextResponse.json({ purchases });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
