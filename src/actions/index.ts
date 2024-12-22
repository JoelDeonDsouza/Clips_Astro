import { createId } from "@paralleldrive/cuid2";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { db } from "../db";
import { userPost, postLikes, postComments } from "../db/schema";
import { eq, and } from "drizzle-orm";

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
  likeImage: defineAction({
    input: z.object({
      postId: z.string(),
    }),
    handler: async ({ postId }, context) => {
      const currentUser = context.locals.user?.id;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }
      try {
        const existingLike = await db.query.postLikes.findFirst({
          where: and(
            eq(postLikes.userId, currentUser),
            eq(postLikes.postId, postId)
          ),
        });

        if (existingLike) {
          const deletedLike = await db
            .delete(postLikes)
            .where(
              and(
                eq(postLikes.userId, currentUser),
                eq(postLikes.postId, postId)
              )
            )
            .returning();
          return { success: deletedLike[0] };
        } else {
          const newLike = await db
            .insert(postLikes)
            .values({
              id: createId(),
              userId: currentUser,
              postId,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .returning();
          return { success: newLike[0] };
        }
      } catch (error) {
        console.error("Error handling likeImage:", error);
        return { success: false, error: "Failed to handle like action" };
      }
    },
  }),

  updateVisibility: defineAction({
    input: z.object({
      postId: z.string(),
    }),
    handler: async ({ postId }, context) => {
      const currentUser = context.locals.user?.id;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }
      try {
        const post = await db.query.userPost.findFirst({
          where: and(eq(userPost.id, postId), eq(userPost.userId, currentUser)),
        });

        if (!post) {
          throw new Error("Post not found");
        }

        const updatedVisibility = await db
          .update(userPost)
          .set({ visibility: !post.visibility })
          .where(and(eq(userPost.id, postId), eq(userPost.userId, currentUser)))
          .returning();
        return { success: true, visibility: updatedVisibility[0].visibility };
      } catch (error) {
        console.error("Error handling updateVisibility:", error);
        return { success: false, error: "Failed to handle visibility action" };
      }
    },
  }),

  deletePost: defineAction({
    input: z.object({
      postId: z.string(),
    }),
    handler: async ({ postId }, context) => {
      const currentUser = context.locals.user?.id;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }
      try {
        const post = await db.query.userPost.findFirst({
          where: and(eq(userPost.id, postId), eq(userPost.userId, currentUser)),
        });
        if (!post) {
          throw new Error("Post not found");
        }
        const deletedPost = await db
          .delete(userPost)
          .where(eq(userPost.id, post.id));
        return { success: "deleted" };
      } catch (error) {
        console.error("Error handling deletePost:", error);
        return { success: false, error: "Failed to handle delete action" };
      }
    },
  }),
};
