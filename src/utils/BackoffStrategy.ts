export enum BackoffStrategy {
  ExponentialBackoff = "exponential",
  LinearBackoff = "linear",
}

export interface RetryOptions {
  maxRetries: number;
  startingDelay: number; // in milliseconds
  strategy: BackoffStrategy;
}

// Utility to wait
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBackoffDelay(attempt: number, options: RetryOptions): number {
  const { startingDelay, strategy } = options;

  switch (strategy) {
    case BackoffStrategy.ExponentialBackoff:
      return startingDelay * Math.pow(2, attempt);
    case BackoffStrategy.LinearBackoff:
      return startingDelay * (attempt + 1);
    default:
      throw new Error(`Unsupported backoff strategy: ${strategy}`);
  }
}
