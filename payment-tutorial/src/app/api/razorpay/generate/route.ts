import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });
    const options = {
      amount: (body.amount * 100).toString(),
      currency: body.currency,
      receipt: body.receipt,
    };
    const order = await razorpay.orders.create(options);
    if (!order)
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    return NextResponse.json(order);
  } catch (error: any) {
    NextResponse.json({ message: error.description }, { status: 500 });
  }
}
