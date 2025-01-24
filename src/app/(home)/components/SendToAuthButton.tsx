"use client";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function SendToAuthButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => router.push("/auth")}
    >
      Sign In
    </Button>
  );
}
