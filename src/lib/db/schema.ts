import { pgTable, uuid, text, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", ["admin", "seller"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(), // Akan di-sync dengan auth.users Supabase
  name: text("name").notNull(),
  phone: text("phone"),
  role: roleEnum("role").default("seller").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  sellerName: text("seller_name"), // Display name of the producer (e.g., Mbah Warni)
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(), // Pertanian, Peternakan, Olahan
  imageUrl: text("image_url"),
  contact: text("contact").notNull(),
  isApproved: boolean("is_approved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productViews = pgTable("product_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
});

export const contactClicks = pgTable("contact_clicks", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(), // e.g., 'home_hero_title', 'about_description'
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
