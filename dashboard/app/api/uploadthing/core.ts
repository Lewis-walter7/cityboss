
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAdminSession } from "@/lib/auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    vehicleImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
        .middleware(async ({ req }) => {
            try {
                console.log("🔐 Attempting to get admin session for upload...");
                const user = await getAdminSession();

                if (!user) {
                    console.error("❌ No user session found - upload blocked");
                    throw new UploadThingError("Unauthorized");
                }

                console.log("✅ Upload authorized for user:", user.id);
                return { userId: String(user.id) };
            } catch (error) {
                console.error("🚨 Middleware error:", error);
                throw error;
            }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("✅ Upload complete:", file.ufsUrl);
            return { uploadedBy: metadata.userId, url: file.ufsUrl };
        }),
    propertyImage: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
        .middleware(async ({ req }) => {
            const user = await getAdminSession();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: String(user.id) };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
