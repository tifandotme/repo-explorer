export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <div className="mb-32 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="h-10 w-64 animate-pulse rounded bg-muted font-mono text-4xl font-extrabold"></div>
          <div className="mt-2 h-4 w-48 animate-pulse rounded bg-muted"></div>
        </div>
        <div className="inline-flex h-9 w-36 animate-pulse items-center gap-2 rounded bg-muted px-1 py-2"></div>
      </div>

      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <div className="-mx-2 px-2 py-2">
              <div className="mb-3 flex items-start justify-between">
                <div className="inline-flex items-center gap-1">
                  {/* BookMarked icon + repo name */}
                  <div className="size-4 animate-pulse rounded bg-muted/60"></div>
                  <div className="h-6 w-40 animate-pulse rounded bg-muted"></div>
                </div>
                {/* Star count */}
                <div className="ml-2 flex shrink-0 items-center gap-1">
                  <div className="size-4 animate-pulse rounded bg-muted"></div>
                  <div className="h-4 w-6 animate-pulse rounded bg-muted"></div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 h-4 w-full animate-pulse rounded bg-muted"></div>
              <div className="mb-4 h-4 w-4/5 animate-pulse rounded bg-muted"></div>

              {/* Language and date */}
              <div className="flex flex-wrap justify-between text-sm">
                <div className="h-6 w-16 animate-pulse rounded-full bg-muted"></div>
                <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
              </div>
            </div>
            {index < 9 && <div className="my-4 border-t border-border" />}
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="h-9 w-9 animate-pulse rounded-md bg-muted"></div>
        <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
        <div className="h-9 w-9 animate-pulse rounded-md bg-muted"></div>
      </div>
    </div>
  )
}
