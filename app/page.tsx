"use client";

import { useEffect, useState } from "react";
import { StickyHeader } from "@/components/sticky-header";
import { ILogRecord } from "@opentelemetry/otlp-transformer";
import { Histogram } from "@/components/histogram";
import { LogList } from "@/components/log-list";
import { LogListLoading } from "@/components/log-list-loading";
import { fetchLogs } from "@/queries/GET/fetch-logs";
import { LogDetailsSheet } from "@/components/log-details-overlay";

export default function Page() {
  const [logs, setLogs] = useState<ILogRecord[] | null>(null);
  const [selectedLog, setSelectedLog] = useState<ILogRecord | null>(null);

  useEffect(() => {
    fetchLogs().then(setLogs);
  }, []);

  return (
    <>
      <Histogram logs={logs} />
      <StickyHeader />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {logs ? (
          <LogList logs={logs} onLogClick={setSelectedLog} />
        ) : (
          <LogListLoading />
        )}
      </div>
      <LogDetailsSheet log={selectedLog} onClose={() => setSelectedLog(null)} />
    </>
  );
}
