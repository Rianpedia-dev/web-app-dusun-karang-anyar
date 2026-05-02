import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";

dotenv.config({ path: ".env.local" });

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin Dusun";

  if (!email || !password) {
    console.error("Gunakan: npx tsx src/lib/db/create-admin.ts <email> <password> <nama?>");
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const dbUrl = process.env.DATABASE_URL!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const client = postgres(dbUrl, { prepare: false });
  const db = drizzle(client, { schema });

  console.log(`Mencoba mendaftarkan akun admin: ${email}...`);

  // 1. Sign up user di Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      }
    }
  });

  if (authError) {
    console.error("Gagal mendaftar di Supabase Auth:", authError.message);
    process.exit(1);
  }

  const userId = authData.user?.id;

  if (!userId) {
    console.error("Gagal mendapatkan User ID dari Supabase.");
    process.exit(1);
  }

  console.log(`User Auth berhasil dibuat dengan ID: ${userId}`);

  // 2. Insert/Update ke tabel publik users dengan role admin
  try {
    // Cek apakah user sudah ada di tabel publik
    const existingUser = await db.select().from(schema.users).where(eq(schema.users.id, userId)).limit(1);

    if (existingUser.length > 0) {
      await db.update(schema.users).set({ 
        role: "admin",
        name: name 
      }).where(eq(schema.users.id, userId));
      console.log("User sudah ada, role berhasil diupdate menjadi Admin.");
    } else {
      await db.insert(schema.users).values({
        id: userId,
        name,
        role: "admin",
      });
      console.log("User berhasil ditambahkan ke tabel publik dengan role Admin.");
    }

    console.log("\n==========================================");
    console.log("SUKSES: Akun Admin Berhasil Dibuat!");
    console.log(`Email: ${email}`);
    console.log("Silakan login di halaman /login");
    console.log("==========================================");
    
    process.exit(0);
  } catch (dbError) {
    console.error("Gagal menyimpan ke database publik:", dbError);
    process.exit(1);
  }
}

createAdmin();
