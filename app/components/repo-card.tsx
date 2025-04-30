"use client"

import { ReadmeSkeleton } from "@/components/readme-skeleton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookMarked, ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  owner: {
    login: string
  }
}

async function fetchReadme(owner: string, repo: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3.html",
        },
      },
    )

    if (!response.ok) {
      if (response.status === 404) {
        return "<p>No README found for this repository.</p>"
      }
      throw new Error(`GitHub API returned ${response.status}`)
    }

    return await response.text()
  } catch (error) {
    console.error("Error fetching README:", error)
    return "<p>Failed to load README content.</p>"
  }
}

export function RepositoryCard({ repo }: { repo: Repository }) {
  const [readme, setReadme] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenChange = async (open: boolean) => {
    if (open && !readme) {
      setIsLoading(true)
      try {
        const readmeContent = await fetchReadme(repo.owner.login, repo.name)
        setReadme(readmeContent)
      } catch (error) {
        console.error("Failed to fetch README:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger className="-mx-2 w-full cursor-pointer px-2 py-2 hover:bg-neutral-500/5">
        <div className="mb-3 flex items-start justify-between">
          <h2 className="text-lg font-bold">
            <span className="inline-flex items-center gap-1 text-primary">
              <BookMarked className="size-4 text-black/40" />
              {repo.name}
            </span>
          </h2>
          <div className="ml-2 flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-4" />
            <span>{repo.stargazers_count}</span>
          </div>
        </div>

        {repo.description && (
          <p className="mb-4 text-left text-sm text-muted-foreground">
            {repo.description}
          </p>
        )}

        <div className="flex flex-wrap justify-between text-sm">
          {repo.language ?
            <span className="rounded-full bg-accent px-2 py-1 text-xs text-accent-foreground">
              {repo.language}
            </span>
          : <div />}
          <span className="mt-1 text-xs text-muted-foreground">
            Updated: {new Date(repo.updated_at).toLocaleDateString()}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(80vh,720px)] sm:max-w-4xl [&>button:last-child]:hidden">
        <div className="overflow-y-auto">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6 text-xl">
              {repo.name}
              {repo.description && (
                <p className="mt-1 text-sm font-normal text-muted-foreground">
                  {repo.description}
                </p>
              )}
            </DialogTitle>
            <div className="px-6 py-6">
              {isLoading ?
                <div className="py-4">
                  <ReadmeSkeleton />
                </div>
              : <div
                  className="prose max-w-none prose-slate dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html:
                      readme || "<p>No README found for this repository.</p>",
                  }}
                />
              }
            </div>
          </DialogHeader>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <Button asChild variant="default">
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              View on GitHub
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
