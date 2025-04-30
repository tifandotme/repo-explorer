import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="font-heading text-4xl font-bold">User Not Found</h1>
      <p className="text-lg text-muted-foreground">
        The GitHub user you&apos;re looking for doesn&apos;t exist or isn&apos;t
        publicly available.
      </p>
      <Button asChild>
        <Link href="/">Back to Search</Link>
      </Button>
    </div>
  )
}
