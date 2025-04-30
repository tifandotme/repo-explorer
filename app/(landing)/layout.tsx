import { cn } from "@/lib/utils"
import Image from "next/image"
import bgImage from "./landing-bg.webp"

export default function LandingLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative overflow-x-hidden">
      <Image
        src={bgImage}
        alt="Background"
        fill
        className="z-0 object-cover object-[80%_50%]"
        priority
      />

      <div
        className={cn(
          "absolute bottom-0 left-0 z-10",
          "size-[800px]",
          "bg-gradient-to-tr from-black/90 via-transparent to-transparent",
        )}
      />

      <div className="relative z-20">{children}</div>
    </div>
  )
}
