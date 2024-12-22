import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "astro:actions";
import type { User } from "better-auth";
import type { TImagePost } from "../lib/infer-type";

type CommentProps = {
  currentUser: User | null;
  imgData: TImagePost;
  onCommentAdded: (comment: string) => void;
};

export default function CommentForm({
  currentUser,
  imgData,
  onCommentAdded,
}: CommentProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    if (!currentUser) return;
    setIsSubmitting(true);
    try {
      const commentResult = await actions.addComment({
        postId: imgData.id,
        comment: data.comment,
      });
      if (commentResult.data) {
        if (commentResult.data?.content) {
          onCommentAdded(commentResult.data.content.comment);
        }
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      window.location.reload();
    }
  };
  if (!currentUser) {
    return (
      <span className="text-center text-sm text-gray-500">
        Please login to comment
      </span>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex items-center mb-4"
    >
      <textarea
        {...register("comment", {
          required: "Comment can't be empty",
          maxLength: { value: 200, message: "Comment is too long" },
        })}
        placeholder="Add a comment..."
        className="input flex-1 input-bordered p-2 min-h-[4rem]"
        rows={2}
      />
      {errors.content && (
        <p className="text-sm text-red-500">
          {errors.content.message as string}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary ml-2"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
