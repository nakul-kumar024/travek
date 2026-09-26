import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const { userId } = await auth();

  // Simple protection - only allow signed in users for now
  if (!userId) {
    redirect("/signin");
  }

  const bookings = await prisma.booking.findMany({
    include: {
      hotel: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin - All Bookings</h1>
          <Link href="/" className="text-amber-600 hover:underline">
            ← Back to site
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Hotel</th>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Check-in</th>
                <th className="text-left p-4">Check-out</th>
                <th className="text-left p-4">Guests</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{booking.hotel.name}</td>
                  <td className="p-4">{booking.user?.name || booking.user?.email || "—"}</td>
                  <td className="p-4">{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(booking.checkOut).toLocaleDateString()}</td>
                  <td className="p-4">{booking.guests}</td>
                  <td className="p-4">${booking.totalPrice}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="p-10 text-center text-gray-500">No bookings yet</div>
          )}
        </div>
      </div>
    </div>
  );
}