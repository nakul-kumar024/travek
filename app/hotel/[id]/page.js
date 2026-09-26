import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Wifi,
  ArrowLeft,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import PaymentButton from "@/component/PaymentButton";

export default async function HotelDetailPage({ params }) {
  const { id } = await params;
  const { userId } = await auth();

  const hotel = await prisma.hotel.findUnique({
    where: { id },
  });

  if (!hotel) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-amber-50/40 to-orange-50/30" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-orange-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-medium"
            >
              <ArrowLeft size={20} />
              Back to search
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10">
            <div className="lg:col-span-3 relative h-105 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={hotel.images[0] || "/placeholder.jpg"}
                alt={hotel.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {hotel.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className="relative h-24 lg:h-24.5 rounded-xl overflow-hidden"
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <Star size={18} className="fill-current" />
                  <span className="font-semibold text-gray-900">{hotel.rating}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h1>

                <p className="flex items-center gap-1.5 text-gray-600">
                  <MapPin size={16} />
                  {hotel.location}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  About this place
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {hotel.description || "No description available."}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {hotel.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                        <Wifi size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== Booking Card ===== */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl p-6 space-y-5">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ${hotel.price}
                  </span>
                  <span className="text-gray-500 mb-1">/ night</span>
                </div>

                {userId ? (
                  <PaymentButton hotel={hotel} userId={userId} />
                ) : (
                  <SignInButton mode="modal">
                    <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/25">
                      Sign in to Reserve
                    </button>
                  </SignInButton>
                )}

                <p className="text-center text-sm text-gray-500">
                  You won’t be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}