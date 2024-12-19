import { signOut } from "../lib/auth-client.ts";

export default function SignOut() {
  return (
    <button
      className="btn btn-primary"
      onClick={async () => {
        const res = await signOut();
        if (res?.error) {
          throw new Error(res.error.message);
        }
        if (res?.success) {
          console.warn(res.success);
          window.location.href = "/";
        }
      }}
    >
      Sign out
    </button>
  );
}
