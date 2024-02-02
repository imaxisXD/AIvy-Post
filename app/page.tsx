import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        className="text-white px-5 py-1 border border-green-300 bg-green-400/60 hover:bg-green-400/40 rounded-md"
        href="/login"
      >
        Sign in
      </Link>
      <div>
        <textarea name="tweet" id="tweet" cols={30} rows={10}></textarea>
      </div>
    </main>
  );
}
