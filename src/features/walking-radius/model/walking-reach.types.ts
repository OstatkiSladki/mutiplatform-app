export interface WalkingReachResult {
  ring: [number, number][];
  radiusMeters: number;
  venueDurationSeconds: Record<number, number | null>;
}
