"use client";
import { ReactNode } from "react";
import useStoreUserEffect from "./useUserStore";

export default function StoreUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  useStoreUserEffect();

  return <>{children}</>;
}
