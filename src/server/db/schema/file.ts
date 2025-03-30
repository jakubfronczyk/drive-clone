import { index, integer, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../schema";

export const folder_table = createTable(
  "folders_table",
  {
    id: integer("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    parent: integer("parent"),
  },
  (folder) => ({
    parentIdx: index("folders_parent_idx").on(folder.parent),
  }),
);
