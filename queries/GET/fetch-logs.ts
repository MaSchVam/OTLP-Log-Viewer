import {
  IExportLogsServiceRequest,
  ILogRecord,
} from "@opentelemetry/otlp-transformer";
import { TAKE_HOME_API_URL } from "../constants";

// Normally, for a more fully-fledged React application, I would use something like Tanstack Query to handle data fetching, since it provides a lot of features out of the box, like caching, pagination, and more.
// However, for this small application, I opted to use the native fetch API, since it's simple and straightforward. We only need to fetch the logs once, and we only have one page.

export const fetchLogs = async (): Promise<ILogRecord[] | null> => {
  try {
    const response = await fetch(TAKE_HOME_API_URL);
    const data: IExportLogsServiceRequest = await response.json();

    if (!data.resourceLogs) {
      throw new Error("Invalid logs response");
    }

    const sortedLogRecords = data.resourceLogs
      .flatMap((resourceLog) =>
        resourceLog.scopeLogs.flatMap((scopeLog) => scopeLog.logRecords)
      )
      .filter((logRecord): logRecord is ILogRecord => logRecord !== undefined)
      .sort((a, b) => Number(a.timeUnixNano) - Number(b.timeUnixNano));

    return sortedLogRecords;
  } catch (error) {
    console.error("Failed to fetch logs:", error);
    return null;
  }
};
