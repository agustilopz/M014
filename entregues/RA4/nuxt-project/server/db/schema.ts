import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull(),
  login: text("login"),
  password: text("password"),
});

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  country: text("country").notNull(),
  director: text("director").notNull(),
  runtime: integer("runtime").notNull(),
  posterUrl: text("poster_url"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});
