import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

async function setupStorage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log("Setting up Supabase Storage...");

  // 1. Create the 'products' bucket if it doesn't exist
  const { data: bucket, error: bucketError } = await supabase.storage.createBucket('products', {
    public: true,
    fileSizeLimit: 2097152, // 2MB
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  });

  if (bucketError) {
    if (bucketError.message.includes("already exists")) {
      console.log("Bucket 'products' already exists.");
    } else {
      console.error("Error creating bucket:", bucketError.message);
    }
  } else {
    console.log("Bucket 'products' created successfully.");
  }

  console.log("Storage setup complete!");
}

setupStorage();
