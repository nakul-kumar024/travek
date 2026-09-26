import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function TripsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/signin");
  }

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      hotel: true,
    },
    orderBy: {
      checkIn: "asc",
    },
  });

  const upcoming = bookings.filter((b) => new Date(b.checkOut) >= new Date());
  const past = bookings.filter((b) => new Date(b.checkOut) < new Date());

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/30 to-orange-50/20">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <ArrowLeft size={18} />
            Back
          </Link>
          <div className="text-lg font-bold text-gray-900">
            Bookme<span className="text-amber-500">.com</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Trips</h1>
        <p className="text-gray-500 mb-10">Manage your upcoming and past stays</p>

        {/* Upcoming */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Upcoming</h2>

          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-40 sm:h-auto relative shrink-0">
                    <img
                      src={booking.hotel.images[0] || ""}
                      alt={booking.hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-gray-900 text-lg">{booking.hotel.name}</h3>
                      <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                        {booking.status}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                      <MapPin size={14} />
                      {booking.hotel.location}
                    </p>
                    <p className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                      <Calendar size={14} />
                      {new Date(booking.checkIn).toLocaleDateString()} → {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {booking.guests} guests · ${booking.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <p className="text-gray-500 mb-4">You have no upcoming trips</p>
              <Link href="/search" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-xl transition">
                Start exploring
              </Link>
            </div>
          )}
        </div>

        {/* Past */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Past Trips</h2>
          {past.length > 0 ? (
            <div className="space-y-4">
              {past.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-40 sm:h-auto relative shrink-0">
                    <img
                      src={booking.hotel.images[0] || ""}
                      alt={booking.hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{booking.hotel.name}</h3>
                    <p className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                      <MapPin size={14} />
                      {booking.hotel.location}
                    </p>
                    <p className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                      <Calendar size={14} />
                      {new Date(booking.checkIn).toLocaleDateString()} → {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
              No past trips yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}