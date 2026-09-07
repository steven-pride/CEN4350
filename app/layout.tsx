import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/app/ui/NavBar";

// Set page title and description metadata
export const metadata: Metadata = {
  title: "LudaVault",
  description: "Collection manager for board game enthusiasts.",
};

// Root layout that wraps around all pages
export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html>
      {/* full height flex column */}
      <body className="min-h-screen flex flex-col">
        {/* Top navigation bar */}
        <Navbar />

        {/* Main page content */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
