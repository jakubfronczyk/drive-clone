import { Button } from "~/components/ui/button";
import DriveContents from "./drive-contents";
import { QUERIES } from "~/server/db/queries";
import { signOut } from "~/server/auth";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder id</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return (
    <>
      <form
        className="absolute right-2 top-3"
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/sign-in" });
        }}
      >
        <Button
          size="sm"
          type="submit"
          className="border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
        >
          Logout
        </Button>
      </form>
      <DriveContents files={files} folders={folders} parents={parents} />
    </>
  );
}
