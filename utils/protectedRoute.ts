import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function withProtectedRoute(redirectTo: string) {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect(redirectTo);
  }
}
