import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HistogramLoading } from "@/components/histogram-loading";
import { ILogRecord } from "@opentelemetry/otlp-transformer";

interface HistogramProps {
  logs: ILogRecord[] | null;
}

const chartConfig = {
  views: {
    label: "Log Count",
  },
  count: {
    label: "Log Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Histogram({ logs }: HistogramProps) {
  const chartData = useMemo(() => {
    if (!logs) return [];
  
    const logCountsByDate: Record<string, Record<string, number>> = {};
  
    logs.forEach(({ timeUnixNano, severityText }) => {
      const date = new Date(Number(timeUnixNano) / 1e6).toISOString().split("T")[0];
      const severity = severityText || "UNSPECIFIED";
  
      if (!logCountsByDate[date]) {
        logCountsByDate[date] = {};
      }
  
      logCountsByDate[date][severity] = (logCountsByDate[date][severity] || 0) + 1;
    });
  
    return Object.entries(logCountsByDate).map(([date, counts]) => ({
      date,
      ...counts,
    }));
  }, [logs]);

  return (
    <Card className="rounded-none border-b-1 border-t-0 border-x-0">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Log distribution</CardTitle>
          <CardDescription>
            Showing all logs within the timeframe
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-4">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          {chartData.length === 0 ? (
            <HistogramLoading />
          ) : (
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis width={15} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="none"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                  />
                }
              />
              {["ERROR", "WARN", "INFO", "DEBUG", "FATAL", "TRACE"].map(
                (severity) => (
                  <Bar
                    key={severity}
                    dataKey={severity}
                    stackId="a"
                    fill={`var(--severity-${severity.toLowerCase()})`}
                  />
                )
              )}
              <Bar
                key="default"
                dataKey="UNSPECIFIED"
                stackId="a"
                fill="var(--severity-default)"
              />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
