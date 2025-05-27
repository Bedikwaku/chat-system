export class Logger {
  static log(...args: any[]) {
    console.log(`[INFO]`, ...args);
  }

  static info(...args: any[]) {
    console.info(`[INFO]`, ...args);
  }

  static warn(...args: any[]) {
    console.warn(`[WARN]`, ...args);
  }

  static error(...args: any[]) {
    console.error(`[ERROR]`, ...args);
  }

  static debug(...args: any[]) {
    console.debug(`[DEBUG]`, ...args);
  }

  static critical(...args: any[]) {
    console.error(`[CRITICAL]`, ...args);
  }
}
