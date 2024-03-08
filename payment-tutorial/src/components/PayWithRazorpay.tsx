"use client";
import React, { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}
const PayWithRazorpay = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/razorpay/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 2,
            currency: "INR",
            receipt: "order_rcpt_1",
          }),
        }
      );
      setIsLoading(false);
      if (response.ok) {
        let resData = await response.json();
        console.log(resData);

        var options = {
          key: "rzp_test_NWmmolnPl4gb3H", // Razorpay key id
          name: "Aditya shekhar Pvt Ltd",
          currency: resData.currency,
          amount: resData.amount,
          order_id: resData.id,
          description: "Thankyou for your shopping",
          image: "https://example.com/your_logo",
          handler: async function (response: any) {
            // Validate payment at server
            /**
             * response
             * {
              "razorpay_payment_id": "pay_Njjh8SsDOozItj",
              "razorpay_order_id": "order_NjjgJKSikXjEBb",
              "razorpay_signature": "5e19380f189a580e130360b04992b57dc09759b65e08ba5c2596f0c0efb8a6a4"
               }
             */

            try {
              const res = await fetch(
                `http://localhost:3000/api/razorpay/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                }
              );
              if (res.ok) {
                let resData = await res.json();
                console.log(resData);
                alert(resData?.message);
              }
            } catch (error) {
              alert(error);
            }
          },
          prefill: {
            name: "Aditya shekhar",
            email: "aditya@gmail.com",
            contact: "9999999999",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response: any) {
          alert("Payment failed. Please try again. Contact support for help");
        });
      }
      if (!response.ok) {
        let err = await response.json();
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <button
        disabled={isLoading}
        onClick={handlePayment}
        className="flex items-center justify-center bg-gray-900 px-2 py-2 text-md text-white transition hover:bg-gray-700 rounded-md w-full"
      >
        {isLoading ? "Processing..." : "Pay With Razorpay"}
      </button>
    </div>
  );
};

export default PayWithRazorpay;
