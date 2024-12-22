import type { TImagePost } from "../lib/infer-type";
import type { AstroClientDirectives } from "astro";
import { actions } from "astro:actions";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { User } from "better-auth";

type PostProps = {
  currentUser: User;
  postData: TImagePost;
} & AstroClientDirectives;

export default function Likes({ postData, currentUser }: PostProps) {
  const [postLikes, setPostLikes] = useState(postData.likes);

  //  handle likes //
  const handleLikes = async () => {
    if (!currentUser) return;

    const alreadyLiked = postLikes.some(
      (postLike) => postLike.userId === currentUser.id
    );
    const updatedLikes = alreadyLiked
      ? postLikes.filter((postLike) => postLike.userId !== currentUser.id)
      : [
          ...postLikes,
          {
            userId: currentUser.id,
            postId: postData.id,
          },
        ];
    //@ts-ignore
    setPostLikes(updatedLikes);

    // Update the likes on the server side //
    try {
      const { data, error } = await actions.likeImage({ postId: postData.id });
      if (error || !data?.success) {
        setPostLikes(postData.likes);
        console.log("Failed to like/unlike image:", error);
        return;
      }
      if (data?.success) {
        const updateNewLikes = alreadyLiked
          ? postLikes.filter((postLike) => postLike.userId !== currentUser.id)
          : [...postLikes, data.success];
        //@ts-ignore
        setPostLikes(updateNewLikes);
      }
    } catch (err) {
      console.log("Error during like handling:", err);
      setPostLikes(postData.likes);
    }
  };

  return (
    <div className="flex gap-2 items-center cursor-pointer hover:opacity-85 transition-all">
      <Heart
        size={20}
        onClick={handleLikes}
        className={`${
          postLikes.some((postlike) => postlike.userId === currentUser?.id)
            ? "fill-red-600 stroke-red-600"
            : ""
        }`}
      />
      <p
        className={`${
          postLikes.some((postlike) => postlike.userId === currentUser?.id)
            ? "text-red-600"
            : ""
        } text-sm font-bold`}
      >
        {postLikes.length}
      </p>
    </div>
  );
}
