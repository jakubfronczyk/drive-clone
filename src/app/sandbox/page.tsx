import { eq } from "drizzle-orm";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div>
      <h1>Sandbox</h1>
      <p>Seed Function</p>
      <form
        action={async () => {
          "use server";

          await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );

          await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 50000,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );
          // await db.delete(files).where(eq(files.id, files.id)); // This deletes all files

          // // Deleting all folders
          // await db.delete(folders).where(eq(folders.id, folders.id));

          // console.log(folderInsert);
          // console.log(fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
