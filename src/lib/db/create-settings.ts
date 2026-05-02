import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function createSettingsTable() {
  const dbUrl = process.env.DATABASE_URL!;
  const sql = postgres(dbUrl);

  console.log("Creating settings table...");

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    await sql.end();
    process.exit();
  }
}

createSettingsTable();
