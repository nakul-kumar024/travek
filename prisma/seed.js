const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.hotel.deleteMany();

  await prisma.hotel.createMany({
    data: [
      {
        name: "Oceanview Resort & Spa",
        description:
          "Luxury beachfront resort with stunning ocean views, private beach access, and world-class spa facilities.",
        location: "Seminyak, Bali, Indonesia",
        price: 189,
        rating: 4.9,
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
        ],
        amenities: ["Free WiFi", "Private Beach", "Spa", "Pool", "Restaurant", "Air Conditioning"],
      },
      {
        name: "Mountain Escape Villa",
        description:
          "Peaceful mountain villa surrounded by nature. Perfect for a quiet getaway with breathtaking alpine views.",
        location: "Swiss Alps, Switzerland",
        price: 245,
        rating: 4.8,
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        ],
        amenities: ["Free WiFi", "Fireplace", "Mountain View", "Kitchen", "Parking"],
      },
      {
        name: "Tropical Paradise",
        description:
          "Overwater villas in the Maldives with crystal clear waters and private decks.",
        location: "Maldives",
        price: 320,
        rating: 5.0,
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
        ],
        amenities: ["Private Pool", "Butler Service", "Snorkeling", "Free WiFi", "Restaurant"],
      },
      {
        name: "Urban Luxury Hotel",
        description:
          "Modern luxury hotel in the heart of Tokyo with rooftop bar and city views.",
        location: "Tokyo, Japan",
        price: 175,
        rating: 4.7,
        images: [
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
        ],
        amenities: ["Free WiFi", "Gym", "Rooftop Bar", "Restaurant", "Concierge"],
      },
      {
        name: "Desert Oasis Resort",
        description:
          "Luxury desert resort with infinity pools and traditional Arabian hospitality.",
        location: "Dubai, UAE",
        price: 280,
        rating: 4.9,
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
        ],
        amenities: ["Infinity Pool", "Spa", "Free WiFi", "Restaurant", "Desert Safari"],
      },
      {
        name: "Forest Retreat",
        description:
          "Cozy cabin-style retreat deep in the Canadian Rockies. Ideal for nature lovers.",
        location: "Banff, Canada",
        price: 210,
        rating: 4.6,
        images: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
        ],
        amenities: ["Fireplace", "Hiking Trails", "Free WiFi", "Kitchen", "Parking"],
      },
    ],
  });

  console.log("Hotels seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });