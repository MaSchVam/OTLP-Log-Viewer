import { Fixed64 } from "@opentelemetry/otlp-transformer";
import React from "react";

interface LogEntryProps {
  severityText: string | undefined;
  timeUnixNano: Fixed64 | undefined;
  bodyStringValue: string | null | undefined;
  onClick: () => void;
}

export const LogEntry: React.FC<LogEntryProps> = ({
  severityText,
  timeUnixNano,
  bodyStringValue,
  onClick,
}) => {
  const getSeverityColor = (severity: string | undefined) => {
    switch (severity) {
      case "ERROR":
        return "var(--severity-error)";
      case "WARN":
        return "var(--severity-warn)";
      case "INFO":
        return "var(--severity-info)";
      case "DEBUG":
        return "var(--severity-debug)";
      case "FATAL":
        return "var(--severity-fatal)";
      case "TRACE":
        return "var(--severity-trace)";
      default:
        return "var(--severity-default)";
    }
  };

  return (
    <div
      className="flex border-b mb-2 overflow-hidden h-8 cursor-pointer hover:bg-[#161616]"
      onClick={onClick}
    >
      <div
        className="w-2 mr-2"
        style={{ backgroundColor: getSeverityColor(severityText) }}
      ></div>
      <div
        className="flex-1 content-center"
        style={{ color: getSeverityColor(severityText) }}
      >
        {severityText}
      </div>
      <div className="flex-1 content-center">
        {timeUnixNano
          ? new Date(Number(timeUnixNano) / 1e6).toLocaleString()
          : "N/A"}
      </div>
      <div className="flex-1 content-center">{bodyStringValue}</div>
    </div>
  );
};
