import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import HotelCard from "@/component/HotelCard";
import prisma from "@/lib/prisma";

export default async function SearchPage({ searchParams }) {
  const destination = searchParams?.destination || "";
  const checkIn = searchParams?.checkin || "";
  const checkOut = searchParams?.checkout || "";
  const guests = searchParams?.guests || "2 adults";

  const hotels = await prisma.hotel.findMany({
    where: destination
      ? {
          OR: [
            { location: { contains: destination, mode: "insensitive" } },
            { name: { contains: destination, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: {
      rating: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/30 to-orange-50/20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Bookme<span className="text-amber-500">.com</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {destination ? `Stays in ${destination}` : "Search Results"}
            </h1>
            <p className="text-gray-500 mt-1">
              {hotels.length} places found
              {checkIn && ` · ${checkIn}`}
              {checkOut && ` → ${checkOut}`}
              {guests && ` · ${guests}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={{
                id: hotel.id,
                name: hotel.name,
                location: hotel.location,
                price: hotel.price,
                rating: hotel.rating,
                image: hotel.images[0] || "",
              }}
            />
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No hotels found. Try a different destination.
          </div>
        )}
      </div>
    </div>
  );
}