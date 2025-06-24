import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import { Provider } from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "PDFIntellect",
  description: "GUpload and summarize PDF documents using Google Gemini AI. Take notes, manage files, and streamline your workflow with PDFIntellect.",
};

const outfit = Outfit({subsets: ["latin"]});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={outfit.className}
        >
          
          <Provider>
            {children}
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
