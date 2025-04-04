import { ChevronRight, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folder_table } from "~/server/db/schema";
import Link from "next/link";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folder_table.$inferSelect)[];
  parents: (typeof folder_table.$inferSelect)[];
}) {
  // const handleUpload = () => {
  //   alert("Upload functionality would be implemented here");
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/f/1"
              className="mr-2 text-neutral-200 hover:text-white"
            >
              My Drive
            </Link>
            {props.parents.map((folder, _) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-neutral-200 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <Button
            // onClick={handleUpload}
            className="bg-blue-800 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>
        <div className="rounded-lg border border-neutral-500 bg-gradient-to-br from-stone-700 to-stone-800 shadow-xl">
          <div className="border-b border-neutral-500 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
