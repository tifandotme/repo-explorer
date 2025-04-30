import { fonts } from "@/lib/fonts"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Explorer",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={fonts.map((font) => font.variable).join(" ")}>
      <body>{children}</body>
    </html>
  )
}
