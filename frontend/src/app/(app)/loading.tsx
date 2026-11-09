import { Skeleton, StatCardSkeleton } from "@/components/ui/Skeleton";

export default function AppLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <Skeleton variant="text" className="h-8 w-48" />
        <Skeleton variant="rectangle" width={120} height={40} />
      </div>

      <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <Skeleton variant="rectangle" className="h-96 w-full" />
    </div>
  );
}
