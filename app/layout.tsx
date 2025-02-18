import "@/styles/globals.css"
import "@/styles/print.css"
import { Poppins } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"

import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "QuickQR - QR Code Generator",
  description: "Generate QR codes quickly and easily with QuickQR",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", poppins.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

