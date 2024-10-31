import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ILogRecord } from "@opentelemetry/otlp-transformer";

export const LogDetailsSheet = ({
  log,
  onClose,
}: {
  log: ILogRecord | null;
  onClose: () => void;
}) => {
  return (
    <Sheet open={!!log} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Log Details</SheetTitle>
          <SheetDescription>{log && <LogDetails log={log} />}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const LogDetails = ({ log }: { log: ILogRecord }) => {
  return (
    <div>
      {Object.entries(log).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong>{" "}
          {typeof value === "object" ? JSON.stringify(value) : value}
        </div>
      ))}
    </div>
  );
};
