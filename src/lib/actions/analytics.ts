"use server";

import { db } from "@/lib/db";
import { products, productViews, contactClicks, users } from "@/lib/db/schema";
import { eq, sql, count, desc } from "drizzle-orm";

export async function trackView(productId: string) {
  try {
    await db.insert(productViews).values({ productId });
    return { success: true };
  } catch (error) {
    console.error("Error tracking view:", error);
    return { success: false };
  }
}

export async function trackContactClick(productId: string) {
  try {
    await db.insert(contactClicks).values({ productId });
    return { success: true };
  } catch (error) {
    console.error("Error tracking contact click:", error);
    return { success: false };
  }
}

export async function getAdminStats() {
  try {
    const totalProductsResult = await db.select({ count: count() }).from(products);
    const totalAdminsResult = await db.select({ count: count() }).from(users).where(eq(users.role, "admin"));
    const totalViewsResult = await db.select({ count: count() }).from(productViews);
    const totalContactsResult = await db.select({ count: count() }).from(contactClicks);

    return {
      totalProducts: totalProductsResult[0].count,
      totalAdmins: totalAdminsResult[0].count,
      totalViews: totalViewsResult[0].count,
      totalContacts: totalContactsResult[0].count,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      totalProducts: 0,
      totalSellers: 0,
      totalViews: 0,
      totalContacts: 0,
    };
  }
}

export async function getSellerStats(sellerId: string) {
  try {
    // Statistik untuk produk milik seller tertentu
    const myProducts = await db.select({ id: products.id }).from(products).where(eq(products.sellerId, sellerId));
    const productIds = myProducts.map(p => p.id);

    if (productIds.length === 0) {
      return { totalViews: 0, totalContacts: 0, productCount: 0 };
    }

    const totalViews = await db.select({ count: count() })
      .from(productViews)
      .where(sql`${productViews.productId} IN ${productIds}`);
      
    const totalContacts = await db.select({ count: count() })
      .from(contactClicks)
      .where(sql`${contactClicks.productId} IN ${productIds}`);

    return {
      totalViews: totalViews[0].count,
      totalContacts: totalContacts[0].count,
      productCount: productIds.length
    };
  } catch (error) {
    console.error("Error fetching seller stats:", error);
    return { totalViews: 0, totalContacts: 0, productCount: 0 };
  }
}
export async function getRecentActivities() {
  try {
    const latestProducts = await db.select({
      name: products.name,
      createdAt: products.createdAt,
      sellerName: users.name,
    })
    .from(products)
    .leftJoin(users, eq(products.sellerId, users.id))
    .orderBy(desc(products.createdAt))
    .limit(5);

    return latestProducts.map(p => ({
      type: "product" as const,
      title: "Produk Baru",
      description: `${p.name} oleh ${p.sellerName}`,
      time: p.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }
}

export async function getChartData() {
  try {
    // Get daily views for last 30 days
    const dailyViews = await db.select({
      date: sql<string>`DATE(${productViews.viewedAt})::TEXT`,
      count: count()
    })
    .from(productViews)
    .where(sql`${productViews.viewedAt} > NOW() - INTERVAL '30 days'`)
    .groupBy(sql`DATE(${productViews.viewedAt})`)
    .orderBy(sql`DATE(${productViews.viewedAt})`);

    // Get daily contacts for last 30 days
    const dailyContacts = await db.select({
      date: sql<string>`DATE(${contactClicks.clickedAt})::TEXT`,
      count: count()
    })
    .from(contactClicks)
    .where(sql`${contactClicks.clickedAt} > NOW() - INTERVAL '30 days'`)
    .groupBy(sql`DATE(${contactClicks.clickedAt})`)
    .orderBy(sql`DATE(${contactClicks.clickedAt})`);

    // Merge them into a single array for Recharts
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return d.toISOString().split("T")[0];
    });

    return last30Days.map(date => {
      const views = dailyViews.find(v => v.date === date)?.count || 0;
      const contacts = dailyContacts.find(c => c.date === date)?.count || 0;
      return {
        name: new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
        kunjungan: Number(views),
        kontak: Number(contacts),
      };
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
}
