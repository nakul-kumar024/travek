import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { hotelId, checkIn, checkOut, guests, totalPrice } = body;

    if (!hotelId || !checkIn || !checkOut || !guests) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Ensure user exists in our database
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
        image: user.imageUrl || null,
      },
    });

    // Create booking with correct dates
    const booking = await prisma.booking.create({
      data: {
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: Number(guests),
        totalPrice: Number(totalPrice),
        status: "confirmed",
        userId,
        hotelId,
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking create error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}