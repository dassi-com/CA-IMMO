export function SkeletonCard({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-card shadow-card overflow-hidden">
          <div className="h-48 skeleton" />
          <div className="p-5 space-y-3">
            <div className="h-5 skeleton rounded w-3/4" />
            <div className="h-4 skeleton rounded w-1/2" />
            <div className="h-4 skeleton rounded w-full" />
            <div className="flex gap-2 pt-3">
              <div className="h-9 skeleton rounded-card flex-1" />
              <div className="h-9 skeleton rounded-card flex-1" />
              <div className="h-9 w-9 skeleton rounded-card" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-6">
      <div className="h-4 skeleton rounded w-1/4 mb-6" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-10 w-10 skeleton rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 skeleton rounded w-3/4" />
            <div className="h-3 skeleton rounded w-1/2" />
          </div>
          <div className="h-4 skeleton rounded w-20" />
          <div className="h-8 w-8 skeleton rounded-lg" />
          <div className="h-8 w-8 skeleton rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-card shadow-card overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 skeleton rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 skeleton rounded w-3/4" />
                <div className="h-3 skeleton rounded w-1/2" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 skeleton rounded-full w-16" />
              <div className="h-6 skeleton rounded-full w-16" />
            </div>
            <div className="h-9 skeleton rounded-card w-full" />
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
        <div key={i} className="bg-white rounded-card shadow-card overflow-hidden">
          <div className="h-48 skeleton" />
          <div className="p-4 space-y-3">
            <div className="h-6 skeleton rounded w-1/3" />
            <div className="h-4 skeleton rounded w-3/4" />
            <div className="h-3 skeleton rounded w-1/2" />
            <div className="h-3 skeleton rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CitiesSkeleton() {
  return (
    <div className="flex gap-6 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-card overflow-hidden h-64 min-w-[280px] flex-shrink-0">
          <div className="w-full h-full skeleton" />
        </div>
      ))}
    </div>
  );
}

export function PropertyTypesSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-card overflow-hidden border border-border">
          <div className="h-32 skeleton" />
          <div className="p-3 space-y-2">
            <div className="h-4 skeleton rounded w-2/3 mx-auto" />
            <div className="h-3 skeleton rounded w-1/3 mx-auto" />
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
        <div key={i} className="bg-white rounded-card p-6 border border-border">
          <div className="w-20 h-20 skeleton rounded-full mx-auto mb-4" />
          <div className="h-5 skeleton rounded w-2/3 mx-auto mb-3" />
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 skeleton rounded" />
            ))}
          </div>
          <div className="h-9 skeleton rounded-lg w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
}

export function ReadyToFindSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
      <div className="flex-1 w-full space-y-6">
        <div className="h-10 skeleton rounded w-3/4" />
        <div className="h-5 skeleton rounded w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 skeleton rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 skeleton rounded w-3/4" />
                <div className="h-3 skeleton rounded w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-12 skeleton rounded-lg w-40" />
          <div className="h-12 skeleton rounded-lg w-44" />
        </div>
      </div>
      <div className="flex-1 w-full max-w-lg">
        <div className="relative">
          <div className="w-full aspect-[4/3] skeleton rounded-card" />
          <div className="absolute -bottom-4 -left-4 skeleton rounded-card p-4 w-36 h-20" />
          <div className="absolute -top-4 -right-4 skeleton rounded-card p-4 w-32 h-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonInline({ rows = 5 }: { rows?: number }) {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-12 w-12 skeleton rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 skeleton rounded w-3/4" />
            <div className="h-3 skeleton rounded w-1/2" />
          </div>
          <div className="h-4 skeleton rounded w-16" />
          <div className="h-8 w-8 skeleton rounded" />
          <div className="h-8 w-8 skeleton rounded" />
        </div>
      ))}
    </div>
  );
}

// Base skeleton block for use in custom layouts
export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}