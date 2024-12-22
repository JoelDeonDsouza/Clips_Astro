import type { TImagePost } from "../lib/infer-type";
import type { AstroClientDirectives } from "astro";
import { actions } from "astro:actions";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { User } from "better-auth";

type PostProps = {
  currentUser: User;
  postData: TImagePost;
} & AstroClientDirectives;

export default function Visibility({ postData, currentUser }: PostProps) {
  const [visibility, setVisibility] = useState(postData.visibility);
  //  handle visibility //
  const handleVisibility = async () => {
    if (!currentUser) return;

    const updatedVisibility = !visibility;
    setVisibility(updatedVisibility);

    // Update the visibility on the server side //
    try {
      const { data, error } = await actions.updateVisibility({
        postId: postData.id!,
      });
      if (error) {
        setVisibility(postData.visibility);
        console.error("Failed to update visibility:", error);
        return;
      }
      if (data?.success) {
        setVisibility(data.visibility ?? postData.visibility);
      }
    } catch (err) {
      console.error("Error during visibility handling:", err);
      setVisibility(postData.visibility);
    }
  };

  // Only the post owner can change the visibility of the post //
  if (!currentUser || currentUser.id !== postData.userId) return null;

  return (
    <div
      className="flex gap-2 items-center cursor-pointer hover:opacity-85 transition-all"
      onClick={handleVisibility}
    >
      {visibility ? <Eye size={20} /> : <EyeOff size={20} />}
      <p
        className={`${
          visibility ? "text-green-600" : "text-gray-600"
        } text-sm font-bold`}
      >
        {visibility ? "Public" : "Private"}
      </p>
    </div>
  );
}
