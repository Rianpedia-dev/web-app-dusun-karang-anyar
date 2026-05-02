"use server";

import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSetting(key: string, defaultValue: string = "") {
  try {
    const result = await db.select().from(settings).where(eq(settings.key, key));
    return result[0]?.value || defaultValue;
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return defaultValue;
  }
}

export async function updateSetting(key: string, value: string) {
  try {
    await db.insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value, updatedAt: new Date() }
      });
    
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error(`Error updating setting ${key}:`, error);
    return { success: false, error };
  }
}

export async function getAllSettings() {
  try {
    return await db.select().from(settings);
  } catch (error) {
    console.error("Error fetching all settings:", error);
    return [];
  }
}
