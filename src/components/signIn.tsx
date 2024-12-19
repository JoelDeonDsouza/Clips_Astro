import {signIn} from "../lib/auth-client.ts";

export default function SignIn() {
    return (
        <button className="btn btn-primary" onClick={async () => {
            const res = await signIn();
            if (res?.error) {
                console.warn(res.error);
            }
            if (res?.success) {
                console.warn(res.success)
            }
        }}>Sign in</button>
    )
}