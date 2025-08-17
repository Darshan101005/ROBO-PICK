import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoboPick - AI-Powered Shopping Assistant for Color Blind Users",
  description:
    "Shop with confidence using AI-powered vision assistance designed for color blind individuals. Identify ripe fruits and vegetables with 99% accuracy.",
  keywords: "color blind, shopping assistant, AI, accessibility, fruits, vegetables, grocery shopping",
  authors: [{ name: "RoboPick Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#10B981",
  manifest: "/manifest.json",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RoboPick" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen bg-background">{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
