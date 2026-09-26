"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentButton({ hotel, userId }) {
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const router = useRouter();

  const handlePayment = async () => {
    if (!userId) {
      alert("Please sign in first");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: hotel.price }),
      });

      const order = await orderRes.json();

      if (!order.id) {
        throw new Error("Failed to create order");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Bookme",
        description: `Booking for ${hotel.name}`,
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify payment
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // 4. Create booking in database after successful payment
            await fetch("/api/booking/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                hotelId: hotel.id,
                checkIn,
                checkOut,
                guests: Number(guests),
                totalPrice: hotel.price,
              }),
            });

            alert("Payment successful! Booking confirmed.");
            router.push("/trips");
          } else {
            alert("Payment verification failed");
          }
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 rounded-xl p-3 bg-white">
          <label className="text-xs text-gray-500 font-medium">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full outline-none text-sm font-medium mt-1 bg-transparent"
          />
        </div>
        <div className="border border-gray-200 rounded-xl p-3 bg-white">
          <label className="text-xs text-gray-500 font-medium">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full outline-none text-sm font-medium mt-1 bg-transparent"
          />
        </div>
      </div>

      {/* Guests Selection */}
      <div className="border border-gray-200 rounded-xl p-3 bg-white">
        <label className="text-xs text-gray-500 font-medium">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full outline-none text-sm font-medium mt-1 bg-transparent"
        >
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
        </select>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/25 disabled:opacity-60"
      >
        {loading ? "Processing..." : "Pay & Reserve"}
      </button>
    </div>
  );
}