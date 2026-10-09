"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/authActions";

export default function Page() {
    const router = useRouter();
    useEffect(() => {
      async function signout() {
        await logout();
      }
    
      signout();
    }, [router]);
}