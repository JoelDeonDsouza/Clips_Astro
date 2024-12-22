import type { TImagePost } from "../lib/infer-type";
import type { AstroClientDirectives } from "astro";
import { actions } from "astro:actions";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { User } from "better-auth";

type DeleteProps = {
  currentUser: User;
  postData: TImagePost;
} & AstroClientDirectives;

export default function DeletePost({ currentUser, postData }: DeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  //  handle delete //
  const handleDelete = async () => {
    if (!currentUser) return;
    setIsDeleting(true);
    // Update the likes on the server side //
    try {
      const { data, error } = await actions.deletePost({ postId: postData.id });
      if (error) {
        console.error("Failed to delete image:", error);
        return;
      }
      if (data?.success) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log("Error during delete handling:", err);
    } finally {
      setIsDeleting(false);
    }
  };
  // Only the post owner can change the visibility of the post //
  if (!currentUser || currentUser.id !== postData.userId) return null;

  return (
    <div className="flex gap-2 items-center cursor-pointer hover:opacity-85 transition-all">
      <button
        className=""
        // @ts-ignore
        onClick={() =>
          document.getElementById(`${postData.id}modal`).showModal()
        }
      >
        <Trash2
          size={20}
          className={`text-red-600 ${isDeleting && "animate-spin"}`}
        />
      </button>
      <dialog id={`${postData.id}modal`} className="modal">
        <div className="modal-box">
          <span className="font-bold text-lg">
            Are you sure you want to delete this post?
          </span>
          <div className="modal-action">
            <form className="flex gap-2" method="dialog">
              <button className="btn btn-primary" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn btn-secondary">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
