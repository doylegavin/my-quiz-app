interface Window {
  splitbee?: {
    track: (event: string, data?: Record<string, any>) => void;
  };
} 