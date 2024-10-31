import { ILogRecord } from "@opentelemetry/otlp-transformer";
import { LogEntry } from "@/components/log-entry";

export const LogList = ({ logs, onLogClick }: { logs: ILogRecord[] | null, onLogClick: (log: ILogRecord) => void }) => {
    return (
      <div className="flex flex-col min-w-full">
        {logs?.map((logRecord, index) => (
          <LogEntry
            key={index}
            severityText={logRecord.severityText}
            timeUnixNano={logRecord.timeUnixNano}
            bodyStringValue={logRecord.body?.stringValue}
            onClick={() => onLogClick(logRecord)}
          />
        ))}
      </div>
    );
  };