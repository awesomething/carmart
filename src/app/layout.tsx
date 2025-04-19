
import type { Metadata } from "next"; 
import { Mulish, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkProvider } from "@clerk/nextjs";



export const metadata: Metadata = {
  title: "Car Dealership Website",
  description: "This is a car dealership website",
};
const mulish = Mulish({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={cn(
          "antialiased overscroll-none bg-background",
          roboto.variable,
          mulish.variable,
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />

      </body>

    </html>
    </ClerkProvider>
  );
}
