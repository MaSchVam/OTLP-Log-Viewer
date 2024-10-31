import { Skeleton } from "@/components/ui/skeleton";

export const LogListLoading = () => {
  return (
    <>
      {Array.from({ length: 50 }).map((_, index) => (
        <Skeleton
          key={index}
          className="aspect-video h-8 w-full bg-muted/50"
        />
      ))}
    </>
  );
};
