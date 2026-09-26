"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 adults");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests) params.set("guests", guests);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-2 flex flex-col md:flex-row gap-2">

        {/* Destination */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 rounded-xl hover:bg-gray-50 transition">
          <MapPin className="text-gray-400 shrink-0" size={20} />
          <div className="text-left w-full">
            <label className="text-xs text-gray-500 font-medium">Destination</label>
            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full outline-none text-gray-900 font-medium placeholder:text-gray-400 bg-transparent"
            />
          </div>
        </div>

        <div className="hidden md:block w-px bg-gray-200 my-2" />

        {/* Check-in */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 rounded-xl hover:bg-gray-50 transition">
          <Calendar className="text-gray-400 shrink-0" size={20} />
          <div className="text-left w-full">
            <label className="text-xs text-gray-500 font-medium">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full outline-none text-gray-900 font-medium bg-transparent"
            />
          </div>
        </div>

        <div className="hidden md:block w-px bg-gray-200 my-2" />

        {/* Check-out */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 rounded-xl hover:bg-gray-50 transition">
          <Calendar className="text-gray-400 shrink-0" size={20} />
          <div className="text-left w-full">
            <label className="text-xs text-gray-500 font-medium">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full outline-none text-gray-900 font-medium bg-transparent"
            />
          </div>
        </div>

        <div className="hidden md:block w-px bg-gray-200 my-2" />

        {/* Guests */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 rounded-xl hover:bg-gray-50 transition">
          <Users className="text-gray-400 shrink-0" size={20} />
          <div className="text-left w-full">
            <label className="text-xs text-gray-500 font-medium">Guests</label>
            <input
              type="text"
              placeholder="2 adults"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full outline-none text-gray-900 font-medium placeholder:text-gray-400 bg-transparent"
            />
          </div>
        </div>

        {/* Search Button */}
        {/* Search Button */}
        {/* Search Button */}
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium h-11 px-5 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-amber-500/25 text-sm shrink-0 self-center mr-1"
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}