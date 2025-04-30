import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-4">
      <h1 className="text-4xl font-heading font-bold">User Not Found</h1>
      <p className="text-lg text-muted-foreground">
        The GitHub user you&apos;re looking for doesn&apos;t exist or isn&apos;t publicly available.
      </p>
      <Button asChild>
        <Link href="/">Back to Search</Link>
      </Button>
    </div>
  )
}