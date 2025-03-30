import "server-only";

import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folder_table as foldersSchema,
} from "~/server/db/schema";
import { eq, isNull } from "drizzle-orm";

export const QUERIES = {
  getFolders: async function (folderId: number) {
    return await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(foldersSchema.id);
  },

  getFiles: async function (folderId: number) {
    return await db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId))
      .orderBy(filesSchema.id);
  },

  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }

    return parents;
  },

  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    return folder[0];
  },

  // TODO: add user id and owner id
  getRootFolderForUser: async function () {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(isNull(foldersSchema.parent));
    return folder[0];
  },
};
