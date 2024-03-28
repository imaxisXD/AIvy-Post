import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        className="rounded-md border border-green-300 bg-green-400/60 px-5 py-1 text-white hover:bg-green-400/40"
        href="/login"
      >
        Sign in
      </Link>
      <Link
        href="/blog"
        className="rounded-md border border-green-300 bg-green-400/60 px-5 py-1 text-white hover:bg-green-400/40"
      >
        View Blog
      </Link>
    </main>
  );
}
