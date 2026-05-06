import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });

async function seed() {
  console.log("Seeding database...");

  // Clear existing data (optional, but good for a fresh start)
  // await db.delete(schema.contactClicks);
  // await db.delete(schema.productViews);
  // await db.delete(schema.products);
  // await db.delete(schema.users);

  const userIds = [
    "00000000-0000-0000-0000-000000000001",
    "00000000-0000-0000-0000-000000000002",
    "00000000-0000-0000-0000-000000000003",
    "00000000-0000-0000-0000-000000000004",
  ];

  const mockUsers = [
    {
      id: userIds[0],
      name: "Pak Budi",
      phone: "6281234567890",
      role: "seller" as const,
    },
    {
      id: userIds[1],
      name: "Bu Siti",
      phone: "6289876543210",
      role: "seller" as const,
    },
    {
      id: userIds[2],
      name: "Kang Herman",
      phone: "6281122334455",
      role: "seller" as const,
    },
    {
      id: userIds[3],
      name: "Mbah Warni",
      phone: "6285566778899",
      role: "seller" as const,
    },
  ];

  console.log("Inserting users...");
  for (const user of mockUsers) {
    await db.insert(schema.users).values(user).onConflictDoNothing();
  }

  const mockProducts = [
    {
      name: "Beras Organik Karang Anyar",
      description: "Beras organik pilihan hasil panen langsung dari petani Karang Anyar. Ditanam tanpa pestisida kimia sehingga lebih sehat dan pulen.",
      price: 15000,
      category: "Pertanian",
      imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
      sellerId: userIds[0],
      contact: "6281234567890",
      isApproved: true,
    },
    {
      name: "Susu Sapi Segar",
      description: "Susu sapi murni yang diperah pagi hari. Segar, tanpa bahan pengawet, dan sangat baik untuk kesehatan. Tersedia dalam kemasan 1 Liter.",
      price: 20000,
      category: "Peternakan",
      imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
      sellerId: userIds[1],
      contact: "6289876543210",
      isApproved: true,
    },
    {
      name: "Telur Ayam Kampung Asli",
      description: "Telur ayam kampung berkualitas dari ayam yang diumbar bebas. Mengandung protein tinggi dan omega-3.",
      price: 35000,
      category: "Peternakan",
      imageUrl: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?auto=format&fit=crop&q=80&w=600",
      sellerId: userIds[0],
      contact: "6281234567890",
      isApproved: true,
    },
    {
      name: "Kopi Robusta Karang Anyar",
      description: "Biji kopi robusta pilihan yang dipetik dari perkebunan lereng Karang Anyar. Aroma kuat dan cita rasa khas.",
      price: 45000,
      category: "Olahan",
      imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600",
      sellerId: userIds[2],
      contact: "6281122334455",
      isApproved: true,
    },
    {
      name: "Sayur Sawi Hijau Segar",
      description: "Sawi hijau segar, baru dipanen. Bebas ulat dan pestisida. Harga per ikat besar.",
      price: 5000,
      category: "Pertanian",
      imageUrl: "https://images.unsplash.com/photo-1598165682855-8cb5d5aeb990?auto=format&fit=crop&q=80&w=600",
      sellerId: userIds[3],
      contact: "6285566778899",
      isApproved: true,
    },
    {
      name: "Madu Hutan Liar",
      description: "Madu asli dari lebah hutan liar di sekitar. Kaya manfaat dan terjamin keasliannya.",
      price: 85000,
      category: "Olahan",
      imageUrl: "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&q=80&w=600",
      sellerId: userIds[1],
      contact: "6289876543210",
      isApproved: true,
    },
  ];

  console.log("Inserting products...");
  for (const product of mockProducts) {
    await db.insert(schema.products).values(product);
  }

  console.log("Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
