"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function getUsers() {
  try {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateUserRole(id: string, role: "admin" | "seller") {
  try {
    await db.update(users).set({ role }).where(eq(users.id, id));
    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false };
  }
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false };
  }
}

export async function createAdminProfile(data: { id: string, name: string, phone: string }) {
  try {
    await db.insert(users).values({
      id: data.id,
      name: data.name,
      phone: data.phone,
      role: "admin",
    });
    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error) {
    console.error("Error creating admin profile:", error);
    return { success: false, error: "Gagal membuat profil admin." };
  }
}

export async function registerAdmin(data: any) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let authUser, authError;

    if (serviceRoleKey) {
      // Method A: Admin API (Confirmed immediately)
      const supabaseAdmin = createSupabaseClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
      });

      const { data: result, error: err } = await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: { name: data.name }
      });
      authUser = result;
      authError = err;
    } else {
      // Method B: Public SignUp (Follows Supabase project settings)
      const supabase = createSupabaseClient(supabaseUrl, anonKey, {
        auth: { autoRefreshToken: false, persistSession: false }
      });

      const { data: result, error: err } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name }
        }
      });
      authUser = result;
      authError = err;
    }

    if (authError) {
      console.error("Auth Error:", authError);
      return { success: false, error: authError.message };
    }

    if (!authUser.user) {
      return { success: false, error: "Gagal membuat akun auth." };
    }

    await db.insert(users).values({
      id: authUser.user.id,
      name: data.name,
      role: "admin",
    });

    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error) {
    console.error("Error registering admin:", error);
    return { success: false, error: "Terjadi kesalahan sistem saat mendaftarkan admin." };
  }
}

export async function updateAdmin(id: string, data: any) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // 1. Update Profile in DB
    await db.update(users).set({
      name: data.name,
      phone: data.phone,
    }).where(eq(users.id, id));

    // 2. Update Password in Auth if provided
    if (data.password && serviceRoleKey) {
      const supabaseAdmin = createSupabaseClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });

      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, {
        password: data.password
      });

      if (authError) {
        console.error("Auth Update Error:", authError);
        return { success: false, error: "Profil diperbarui, tapi gagal mengubah password: " + authError.message };
      }
    } else if (data.password && !serviceRoleKey) {
      return {
        success: false,
        error: "Profil diperbarui, tapi password gagal diubah karena SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi."
      };
    }

    revalidatePath("/admin/pengguna");
    return { success: true };
  } catch (error) {
    console.error("Error updating admin:", error);
    return { success: false, error: "Terjadi kesalahan sistem saat memperbarui admin." };
  }
}

export async function getAdminById(id: string) {
  try {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    return null;
  }
}
