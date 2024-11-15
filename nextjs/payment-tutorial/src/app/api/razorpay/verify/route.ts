import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    let body = reqBody.razorpay_order_id + "|" + reqBody.razorpay_payment_id;

    let expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === reqBody.razorpay_signature) {
      return NextResponse.json(
        { message: "Payment successfull!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid razorpay signature" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.description }, { status: 500 });
  }
}
