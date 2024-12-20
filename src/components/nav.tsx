import type { Session, User } from "better-auth";
import logo from "../assets/logo.png";
import type { AstroClientDirectives } from "astro";
import SignIn from "./signIn.tsx";
import SignOut from "./signOut.tsx";

type NavProps = {
  sesh: {
    session: Session;
    user: User;
  } | null;
} & AstroClientDirectives;

export default function Nav({ sesh }: NavProps) {
  if (sesh && typeof window !== "undefined") {
    // If the user is logged in, automatically redirect to dashboard //
    if (window.location.pathname !== "/dashboard") {
      window.location.replace("/dashboard");
    }
  }
  return (
    <nav className="py-6">
      <ul className="flex justify-between items-center">
        <li>
          <a
            href="/"
            className="hover:underline flex gap-2 items-center text-xl text-base-content border-2"
          >
            <img className="w-8" src={logo.src} alt="logo" />
            <span className="mr-1">ClipsAstro</span>
          </a>
        </li>
        {!sesh ? <SignIn /> : null}
        {sesh ? (
          <div className="flex items-center gap-6">
            <div>
              <a href="/dashboard">
                <img
                  src={sesh.user.image!}
                  alt="profileImage"
                  className="w-10 h-10 rounded-full"
                />
              </a>
            </div>
            <li>
              <SignOut />
            </li>
          </div>
        ) : null}
      </ul>
    </nav>
  );
}
