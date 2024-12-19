import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export const signIn = async () => {
  const res = await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
  });
  if (res.error) {
    return { error: res.error };
  }
  if (res.data) {
    return { success: res.data };
  }
};

export const signOut = async () => {
  const res = await authClient.signOut();
  if (res.error) {
    return { error: res.error };
  }
  if (res.data) {
    return { success: res.data };
  }
};
