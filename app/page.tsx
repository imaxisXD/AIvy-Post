import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  const { data } = await supabase.from("userdata").select();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!session && (
        <Link
          className="text-white px-5 py-1 border border-green-300 bg-green-400/60 hover:bg-green-400/40 rounded-md"
          href="/login"
        >
          Sign in
        </Link>
      )}

      <p>{user?.email}</p>
    </main>
  );
}
