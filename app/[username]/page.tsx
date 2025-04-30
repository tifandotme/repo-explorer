import { RepositoryCard } from "@/components/repo-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

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

interface GitHubUserInfo {
  public_repos: number
}

const REPOS_PER_PAGE = 10

async function fetchGitHubRepositories(
  username: string,
  page: number = 1,
): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${REPOS_PER_PAGE}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )

    if (!response.ok) {
      if (response.status === 404) {
        notFound()
      }
      throw new Error(`GitHub API returned ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return []
  }
}

async function fetchGitHubUserInfo(
  username: string,
): Promise<GitHubUserInfo | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      if (response.status === 404) {
        notFound()
      }
      throw new Error(`GitHub API returned ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching GitHub user info:", error)
    return null
  }
}

export async function generateMetadata(props: {
  params: Promise<{ username: string }>
}): Promise<Metadata> {
  const { username } = await props.params

  return {
    title: `${username} - Explorer`,
    description: `Explore ${username}'s GitHub repositories`,
  }
}

export default async function UsernamePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { username } = await params
  const { page: pageParams } = await searchParams

  const page = pageParams ? parseInt(pageParams) : 1

  const [repositories, userInfo] = await Promise.all([
    fetchGitHubRepositories(username, page),
    fetchGitHubUserInfo(username),
  ])

  const totalRepos = userInfo?.public_repos || 0
  const totalPages = Math.ceil(totalRepos / REPOS_PER_PAGE)

  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <div className="mb-32 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-mono text-4xl font-extrabold">{username}</h1>
          {totalRepos > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              Showing {Math.min((page - 1) * REPOS_PER_PAGE + 1, totalRepos)}-
              {Math.min(page * REPOS_PER_PAGE, totalRepos)} of {totalRepos}{" "}
              repositories
            </p>
          )}
        </div>
        <Link
          className="-mx-1 inline-flex items-center gap-2 px-1 py-2 text-sm hover:bg-neutral-500/5"
          href="/"
        >
          <ArrowLeft className="size-4" />
          Back to Homepage
        </Link>
      </div>

      {repositories.length === 0 ?
        <p className="text-muted-foreground">
          No repositories found for this user.
        </p>
      : <>
          {repositories.map((repo, index) => (
            <div key={repo.id}>
              <RepositoryCard repo={repo} />
              {index < repositories.length - 1 && (
                <div className="my-4 border-t border-border" />
              )}
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className={page <= 1 ? "cursor-not-allowed opacity-50" : ""}
                asChild={page > 1}
                disabled={page <= 1}
              >
                {page > 1 ?
                  <Link href={`/${username}?page=${page - 1}`}>
                    <ChevronLeft className="size-5" />
                    <span className="sr-only">Previous page</span>
                  </Link>
                : <span>
                    <ChevronLeft className="size-5" />
                    <span className="sr-only">Previous page</span>
                  </span>
                }
              </Button>

              <div className="text-sm">
                Page {page} of {totalPages}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className={
                  page >= totalPages ? "cursor-not-allowed opacity-50" : ""
                }
                asChild={page < totalPages}
                disabled={page >= totalPages}
              >
                {page < totalPages ?
                  <Link href={`/${username}?page=${page + 1}`}>
                    <ChevronRight className="size-5" />
                    <span className="sr-only">Next page</span>
                  </Link>
                : <span>
                    <ChevronRight className="size-5" />
                    <span className="sr-only">Next page</span>
                  </span>
                }
              </Button>
            </div>
          )}
        </>
      }
    </div>
  )
}
