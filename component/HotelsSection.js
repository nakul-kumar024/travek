import { ChevronRight } from "lucide-react";
import HotelCard from "./HotelCard";
import prisma from "@/lib/prisma";

export default async function HotelsSection() {
  const hotels = await prisma.hotel.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 8,
  });

  return (
    <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Hotels in your area</h2>
          <p className="text-gray-500 mt-2">Discover the best places to stay near you</p>
        </div>
        <a
          href="/search"
          className="hidden sm:flex items-center gap-1 text-amber-600 font-medium hover:underline"
        >
          View all <ChevronRight size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
}