
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAdminSession } from "@/lib/auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    vehicleImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
        .middleware(async ({ req }) => {
            const user = await getAdminSession();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: String(user.id) };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.url };
        }),
    propertyImage: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
        .middleware(async ({ req }) => {
            const user = await getAdminSession();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: String(user.id) };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
