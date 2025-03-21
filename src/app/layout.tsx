
import type { Metadata } from "next"; 
import { Mulish, Roboto } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
=======
>>>>>>> df4a4200c887dcde12afd8c1c4ccd71d878c6ae7
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";



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
  );
}
