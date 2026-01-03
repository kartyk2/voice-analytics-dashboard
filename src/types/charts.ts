/**
 * Area chart: Call Duration over time
 */
export interface CallDurationPoint {
  time: string;        // e.g. "0s", "30s", "1m"
  duration: number;    // seconds
}

/**
 * Donut chart: Sad path reasons
 */
export interface SadPathPoint {
  label: string;       // e.g. "Unsupported Language"
  value: number;       // percentage or count
}

/**
 * All chart data we store per user
 */
export interface UserChartData {
  callDuration: CallDurationPoint[];
  sadPath: SadPathPoint[];
}

/**
 * Supabase table row shape
 */
export interface UserChartRow {
  email: string;
  chart_values: UserChartData;
  updated_at?: string;
}
