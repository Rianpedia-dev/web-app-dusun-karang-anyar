"use server";

import { db } from "@/lib/db";
import { products, productViews, contactClicks, users } from "@/lib/db/schema";
import { eq, desc, and, ilike, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProducts(options: { 
  category?: string; 
  search?: string; 
  approvedOnly?: boolean;
} = {}) {
  try {
    const { category, search, approvedOnly = true } = options;
    
    let query = db.select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      category: products.category,
      imageUrl: products.imageUrl,
      sellerId: products.sellerId,
      sellerName: sql<string>`COALESCE(${products.sellerName}, ${users.name})`,
      sellerLocation: sql<string>`'Dusun Karang Anyar'`,
      isApproved: products.isApproved,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(users, eq(products.sellerId, users.id))
    .$dynamic();

    const conditions = [];
    if (approvedOnly) conditions.push(eq(products.isApproved, true));
    if (category && category !== "Semua") conditions.push(eq(products.category, category));
    if (search) conditions.push(ilike(products.name, `%${search}%`));

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    return await query.orderBy(desc(products.createdAt));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const result = await db.select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      category: products.category,
      imageUrl: products.imageUrl,
      sellerId: products.sellerId,
      sellerName: sql<string>`COALESCE(${products.sellerName}, ${users.name})`,
      sellerLocation: sql<string>`'Dusun Karang Anyar'`,
      sellerContact: products.contact,
      isApproved: products.isApproved,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(users, eq(products.sellerId, users.id))
    .where(eq(products.id, id))
    .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}

export async function createProduct(data: any) {
  try {
    const result = await db.insert(products).values({
      ...data,
      isApproved: data.isApproved ?? false,
    }).returning();
    
    revalidatePath("/produk");
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Gagal menambahkan produk" };
  }
}

import { deleteProductImage } from "@/lib/supabase/storage";

export async function updateProduct(id: string, data: any) {
  try {
    // If a new image is being set, delete the old one
    if (data.imageUrl) {
      const oldProduct = await db.select().from(products).where(eq(products.id, id)).limit(1);
      if (oldProduct[0] && oldProduct[0].imageUrl && oldProduct[0].imageUrl !== data.imageUrl) {
        await deleteProductImage(oldProduct[0].imageUrl);
      }
    }

    await db.update(products).set(data).where(eq(products.id, id));
    
    revalidatePath(`/produk/${id}`);
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Gagal memperbarui produk" };
  }
}

export async function deleteProduct(id: string) {
  try {
    // 1. Get product image URL
    const product = await db.select().from(products).where(eq(products.id, id)).limit(1);
    
    if (product[0] && product[0].imageUrl) {
      // 2. Delete from Supabase Storage
      await deleteProductImage(product[0].imageUrl);
    }

    // 3. Delete from DB
    await db.delete(products).where(eq(products.id, id));
    
    revalidatePath("/produk");
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Gagal menghapus produk" };
  }
}

export async function approveProduct(id: string) {
  try {
    await db.update(products).set({ isApproved: true }).where(eq(products.id, id));
    revalidatePath("/admin");
    revalidatePath("/produk");
    return { success: true };
  } catch (error) {
    console.error("Error approving product:", error);
    return { success: false };
  }
}

export async function rejectProduct(id: string) {
  try {
    await db.update(products).set({ isApproved: false }).where(eq(products.id, id));
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting product:", error);
    return { success: false };
  }
}
