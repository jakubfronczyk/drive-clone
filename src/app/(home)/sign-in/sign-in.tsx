import { Button } from "~/components/ui/button";
import { signIn } from "~/server/auth";

export function SingIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button
        size="lg"
        type="submit"
        className="border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
      >
        Sign In with Google
      </Button>
    </form>
  );
}
