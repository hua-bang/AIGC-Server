import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col w-full space-y-3 px-[28px] py-[32px]">
      <Skeleton className="h-[125px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
}
