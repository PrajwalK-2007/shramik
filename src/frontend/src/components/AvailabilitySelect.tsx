import type { WorkerAvailability } from "@/types";
import { Clock } from "lucide-react";

interface AvailabilitySelectProps {
  value: WorkerAvailability;
  onChange: (value: WorkerAvailability) => void;
  error?: string;
}

export function AvailabilitySelect({
  value,
  onChange,
  error,
}: AvailabilitySelectProps) {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, startTime: e.target.value });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, endTime: e.target.value });
  };

  return (
    <div className="space-y-3" data-ocid="availability_select">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Start Time */}
        <div className="space-y-1.5">
          <label
            htmlFor="avail-start"
            className="text-sm font-medium text-foreground flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-primary" />
            Work Start Time
          </label>
          <div className="relative">
            <input
              id="avail-start"
              type="time"
              value={value.startTime}
              onChange={handleStartChange}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
              data-ocid="availability_select.start_time_input"
            />
          </div>
        </div>

        {/* End Time */}
        <div className="space-y-1.5">
          <label
            htmlFor="avail-end"
            className="text-sm font-medium text-foreground flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-secondary" />
            Work End Time
          </label>
          <div className="relative">
            <input
              id="avail-end"
              type="time"
              value={value.endTime}
              onChange={handleEndChange}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
              data-ocid="availability_select.end_time_input"
            />
          </div>
        </div>
      </div>

      {/* Duration indicator */}
      {value.startTime && value.endTime && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          Available from{" "}
          <span className="font-medium text-foreground">{value.startTime}</span>{" "}
          to{" "}
          <span className="font-medium text-foreground">{value.endTime}</span>
        </p>
      )}

      {error && (
        <p
          className="text-xs text-destructive"
          data-ocid="availability_select.field_error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
