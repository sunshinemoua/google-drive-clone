import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders, files } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          console.log("Testing Seeding...");
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
