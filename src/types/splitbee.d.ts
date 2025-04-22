interface SplitbeeAnalytics {
  track(event: string, data?: any): void;
  user: {
    set(data: Record<string, any>): void;
    anonymousId: string;
  };
}

interface Window {
  splitbee?: SplitbeeAnalytics;
} 