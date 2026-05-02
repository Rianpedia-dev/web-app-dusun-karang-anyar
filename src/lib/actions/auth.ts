"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !user) {
    return { error: error?.message || "Login gagal" };
  }

  // Cek role user
  const profile = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  const role = profile[0]?.role;

  revalidatePath("/", "layout");

  if (role === "admin") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  
  let isSuccess = false;

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      // Simpan ke tabel publik users
      try {
        await db.insert(users).values({
          id: data.user.id,
          name,
          phone,
          role: "seller",
        });
      } catch (dbError) {
        console.error("Error inserting user to public table:", dbError);
        // Tetap lanjut jika data user di auth sudah terbuat
      }
    }
    
    isSuccess = true;
    revalidatePath("/", "layout");
  } catch (err: any) {
    console.error("Unexpected error during registration:", err);
    return { error: err.message || "Terjadi kesalahan yang tidak terduga." };
  }

  if (isSuccess) {
    redirect("/dashboard");
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Ambil detail dari tabel publik termasuk role
  const profile = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  
  return {
    ...user,
    profile: profile[0] || null,
  };
}
