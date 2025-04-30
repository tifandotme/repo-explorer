import { DM_Mono, Instrument_Serif, Inter } from "next/font/google"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--inter",
})

const fontHeading = Instrument_Serif({
  subsets: ["latin"],
  variable: "--instrument-serif",
  weight: "400",
})

const fontMono = DM_Mono({
  subsets: ["latin"],
  variable: "--dm-mono",
  weight: "400",
})

export const fonts = [fontSans, fontHeading, fontMono]
