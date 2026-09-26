"use client";

import { Star, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HotelCard({ hotel }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link href={`/hotel/${hotel.id}`}>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer">
        
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Rating badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-sm">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {hotel.rating}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-white"
            }`}
          >
            <Heart size={16} className={isFavorite ? "fill-current" : ""} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-amber-600 transition line-clamp-1">
                {hotel.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                <MapPin size={14} className="shrink-0" />
                <span className="line-clamp-1">{hotel.location}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">${hotel.price}</span>
              <span className="text-gray-500 text-sm"> / night</span>
            </div>

            <span className="text-sm font-medium text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}