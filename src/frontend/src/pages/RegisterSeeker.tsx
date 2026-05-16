import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export function RegisterSeekerPage() {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: "/" });
  }, [router]);

  return null;
}
