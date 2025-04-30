import { Button } from "@/components/ui/button"
import { ArrowUpRight, AtSign, Github } from "lucide-react"
import { Metadata } from "next"
import Form from "next/form"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Explorer",
}

export default function Home() {
  async function search(formData: globalThis.FormData) {
    "use server"
    const username = formData.get("username")
    if (username && typeof username === "string") {
      redirect(`/${username.trim()}`)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col justify-between px-5 pt-12 pb-20 max-md:gap-20 sm:px-10 md:flex-row md:px-20 md:pb-36">
      <main className="mt-auto flex w-full flex-col self-end text-white">
        <h1 className="mb-3 font-heading text-6xl md:text-8xl">
          Dive Into Their Code
        </h1>
        <p className="text-shadow mb-9 text-lg font-light text-neutral-300 text-shadow-black">
          Feed us a <Github className="inline size-4 -translate-y-0.5" /> GitHub
          username; see their work unfold.
        </p>

        <Form
          action={search}
          className="mt-4 flex w-full flex-col gap-3 sm:flex-row md:max-w-lg"
        >
          <div className="relative h-14 w-full flex-grow rounded-full border border-neutral-700 bg-black/50 pl-11 text-white">
            <input
              autoFocus
              type="text"
              data-slot="input"
              name="username"
              className="peer size-full rounded-r-full focus-visible:outline-none"
            />
            <AtSign className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-700 transition-colors duration-200 peer-focus-visible:text-neutral-500" />
          </div>

          <Button
            className="text-md inline-flex h-14 items-center gap-1 self-start rounded-full bg-white/90 px-5 py-2 font-light text-black transition-colors duration-200 hover:cursor-pointer hover:bg-white max-sm:w-full"
            type="submit"
          >
            Explore
          </Button>
        </Form>
      </main>

      <a
        className="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-white/7 px-5 py-2 text-xs font-light text-white/80 transition-colors duration-200 hover:bg-white/10"
        href="https://github.com/tifandotme/gh-explorer"
        target="_blank"
      >
        Source Code
        <ArrowUpRight className="size-3.5" />
      </a>
    </div>
  )
}
