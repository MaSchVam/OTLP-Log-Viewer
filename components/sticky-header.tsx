import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export const StickyHeader = () => {
  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-10">
      <Breadcrumb className="w-full">
        <BreadcrumbList className="flex w-full">
          <BreadcrumbItem className="flex-1 font-bold text-white">
            Severity
          </BreadcrumbItem>
          <BreadcrumbItem className="flex-1 font-bold text-white">
            Time
          </BreadcrumbItem>
          <BreadcrumbItem className="flex-1 font-bold text-white">
            Body
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
