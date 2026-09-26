"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBooking(formData) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("You must be signed in to book");
  }

  const hotelId = formData.get("hotelId");
  const checkIn = formData.get("checkIn");
  const checkOut = formData.get("checkOut");
  const guests = Number(formData.get("guests"));
  const totalPrice = Number(formData.get("totalPrice"));

  if (!hotelId || !checkIn || !checkOut || !guests) {
    throw new Error("Missing required fields");
  }

  // 1. Make sure the user exists in our database
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

  // 2. Create the booking
  await prisma.booking.create({
    data: {
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      totalPrice,
      status: "confirmed",
      userId,
      hotelId,
    },
  });

  revalidatePath("/trips");
  redirect("/trips");
}