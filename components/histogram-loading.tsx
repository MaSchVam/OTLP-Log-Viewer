import { Skeleton } from "@/components/ui/skeleton";

export const HistogramLoading = () => {
  return (
    <div className="h-[250px] w-full">
      <Skeleton className="h-full w-full rounded-lg bg-muted/50" />
    </div>
  );
};