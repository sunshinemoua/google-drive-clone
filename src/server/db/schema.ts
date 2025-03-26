import {
  int,
  text,
  singlestoreTable,
  bigint,
  index,
  timestamp,
} from "drizzle-orm/singlestore-core";

// Define the files table schema
// stores file metadata and maintains a hierarchical structure through parent references
export const files = singlestoreTable(
  "files_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    name: text("name"),
    size: int("size"),
    parent: bigint("parent", { mode: "bigint" }).notNull(),
    url: text("url"),
  },
  (tempTable) => {
    return [
      // Add index on parent column to optimize queries that filter by parent folder
      index("parent_index").on(tempTable.parent),
    ];
  },
);

// Define the folders table schema with SingleStore
// This table manages folder structure and hierarchy in the file system
export const folders = singlestoreTable(
  "folders_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "bigint" }).notNull(),
  },
  (tempTable) => {
    return [
      // Add index on parent column to optimize queries that filter by parent folder
      index("parent_index").on(tempTable.parent),
    ];
  },
);
