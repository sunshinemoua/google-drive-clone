import {
  int,
  text,
  singlestoreTable,
  bigint,
  index,
  timestamp,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core";

// Helper function to create tables with a prefix
export const createTable = singlestoreTableCreator(
  (name) => `google-drive-clone_${name}`,
);

// Define the files table schema
// stores file metadata and maintains a hierarchical structure through parent references
export const files = createTable(
  "files",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name"),
    size: int("size"),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
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
export const folders = createTable(
  "folders",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (tempTable) => {
    return [
      // Add index on parent column to optimize queries that filter by parent folder
      index("parent_index").on(tempTable.parent),
    ];
  },
);
