import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { authOptions } from "@/lib/auth/config";

const f = createUploadthing();

/**
 * UploadThing file router.
 * Avatar uploads require an authenticated NextAuth session.
 */
export const ourFileRouter = {
  avatarUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;
      if (!userId) {
        throw new UploadThingError("Unauthorized");
      }
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const url =
        ("ufsUrl" in file && typeof file.ufsUrl === "string" && file.ufsUrl) ||
        file.url;
      return { uploadedBy: metadata.userId, url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
