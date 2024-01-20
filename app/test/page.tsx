"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";


export default function Home() {
  const tasks = useQuery(api.);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <H1>dsds</H1>
    </main>
  );
}
