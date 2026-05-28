export function SkeletonCard({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="flex gap-2 pt-3">
              <div className="h-9 bg-gray-200 rounded-xl flex-1" />
              <div className="h-9 bg-gray-200 rounded-xl flex-1" />
              <div className="h-9 w-9 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3 p-6">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-10 w-10 bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-8 w-8 bg-gray-200 rounded-lg" />
          <div className="h-8 w-8 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded-full w-16" />
              <div className="h-6 bg-gray-200 rounded-full w-16" />
            </div>
            <div className="h-9 bg-gray-200 rounded-xl w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeaturedPropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CitiesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden h-56 animate-pulse">
          <div className="w-full h-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export function PropertyTypesSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 animate-pulse">
          <div className="h-32 bg-gray-200" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AgentsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-3" />
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-9 bg-gray-200 rounded-lg w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
}

export function ReadyToFindSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto animate-pulse">
      <div className="flex-1 w-full space-y-6">
        <div className="h-10 bg-white/20 rounded w-3/4" />
        <div className="h-5 bg-white/20 rounded w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/20 rounded w-3/4" />
                <div className="h-3 bg-white/20 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-12 bg-white/20 rounded-lg w-40" />
          <div className="h-12 bg-white/20 rounded-lg w-44" />
        </div>
      </div>
      <div className="flex-1 w-full max-w-lg">
        <div className="relative">
          <div className="w-full aspect-[4/3] bg-white/20 rounded-2xl" />
          <div className="absolute -bottom-4 -left-4 bg-white/20 rounded-xl p-4 w-36 h-20" />
          <div className="absolute -top-4 -right-4 bg-white/20 rounded-xl p-4 w-32 h-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonInline({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse p-6 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
