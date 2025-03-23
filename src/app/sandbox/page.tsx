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
              parent: index !== 0 ? index : null,
            })),
          );

          await db.insert(files).values(
            mockFiles.map((files, index) => ({
              id: index + 1,
              name: files.name,
              size: 50000,
              url: files.url,
              parent: (index % 3) + 1,
            })),
          );
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
