import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Abraham Translation Service - Professional Document Translation",
  description:
    "Professional translation services for legal, medical, technical, and business documents. Fast, accurate, and confidential translations by certified linguists.",
  keywords:
    "translation services, document translation, certified translation, legal translation, medical translation, business translation",
  authors: [{ name: "Abraham Translation Service" }],
  creator: "Abraham Translation Service",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
