import { fonts } from "@/lib/fonts"
import "./globals.css"

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={fonts.map((font) => font.variable).join(" ")}>
      <body>{children}</body>
    </html>
  )
}
