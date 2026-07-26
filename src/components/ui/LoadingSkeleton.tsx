import { Skeleton } from '@astryxdesign/core/Skeleton'

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <Skeleton className={className} />
}
