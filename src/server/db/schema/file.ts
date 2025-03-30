import { index, integer, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../schema";

export const files_table = createTable(
  "files_table",
  {
    id: integer("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    url: varchar("url", { length: 255 }).notNull(),
    parent: integer("parent").notNull(),
    size: integer("size").notNull(),
  },
  (file) => ({
    parentIdx: index("files_parent_idx").on(file.parent),
  }),
);
