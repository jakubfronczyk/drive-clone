import { SingIn } from "./sign-in";

export default function HomePage() {
  return (
    <>
      <h1 className="mb-4 bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        Google Drive Lite
      </h1>
      <p className="mx-auto mb-8 max-w-md text-xl text-neutral-400 md:text-2xl">
        Secure, fast, and easy file storage for the modern web
      </p>
      <SingIn />

      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} Google Drive Lite.
      </footer>
    </>
  );
}
