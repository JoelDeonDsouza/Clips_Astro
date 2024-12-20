import { createId } from "@paralleldrive/cuid2";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { db } from "../db";
import { userPost, postLikes, postComments } from "../db/schema";

export const server = {
  addImage: defineAction({
    input: z.object({
      publicId: z.string(),
      format: z.string().optional(),
    }),
    handler: async ({ publicId, format }, context) => {
      const currentUser = context.locals.user?.id;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }
      try {
        const newImage = await db
          .insert(userPost)
          .values({
            url: publicId,
            id: createId(),
            visibility: false,
            userId: currentUser,
            format,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();
        return { success: true, image: newImage[0].url };
      } catch (error) {
        console.error("Failed to insert image to data base", error);
        return { success: false, error: "Failed to insert image" };
      }
    },
  }),
};
