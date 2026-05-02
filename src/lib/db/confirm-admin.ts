import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function confirmAdmin() {
  const dbUrl = process.env.DATABASE_URL!;
  const sql = postgres(dbUrl);

  console.log("Mencoba mengonfirmasi email admin secara manual di database...");

  try {
    // Update tabel auth.users bawaan Supabase
    const result = await sql`
      UPDATE auth.users 
      SET email_confirmed_at = NOW()
      WHERE email = 'admin@karanganyar.com'
      RETURNING id;
    `;

    if (result.length > 0) {
      console.log(`SUKSES: Email untuk admin@karanganyar.com telah dikonfirmasi (ID: ${result[0].id})`);
      console.log("Sekarang Anda seharusnya bisa login tanpa pesan 'Email not confirmed'.");
    } else {
      console.error("GAGAL: Pengguna dengan email admin@karanganyar.com tidak ditemukan di tabel auth.users.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengakses database:", error);
    console.log("\nCatatan: Jika error 'permission denied', Anda harus mematikan 'Confirm Email' secara manual di Dashboard Supabase (Authentication -> Settings).");
  } finally {
    await sql.end();
    process.exit();
  }
}

confirmAdmin();
