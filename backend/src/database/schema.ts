import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

export type Booking = typeof bookings.$inferSelect;
