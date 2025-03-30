import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser();

  if (!rootFolder) {
    return <form>not implemented yet</form>;
  }

  return redirect(`/f/${rootFolder.id}`);
}
