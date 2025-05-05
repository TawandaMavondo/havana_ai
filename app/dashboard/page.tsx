"use client";
import { useRouter } from "nextjs-toploader/app";

export default function Page({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();
  replace("/dashboard/bookings");
  return <h1>Loading...</h1>;
}
