import { date } from 'quasar';

export default class Helpers {
  public static formatDateTime(d: number|Date, includeSeconds = false): string {
    if (includeSeconds) {
      return date.formatDate(d, 'YYYY-mm-dd hh:mm:ss');
    }
    return date.formatDate(d, 'YYYY-mm-dd hh:mm');
  }

  public static formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return '0 Bytes';
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }

  /** Intended for game times and increments */
  public static formatSeconds(totalSeconds: number) {
    if (totalSeconds === 0) return '0s';
    const seconds = totalSeconds % 60;
    const remainingMinutes = Math.floor(totalSeconds / 60);
    const minutes = remainingMinutes % 60;
    const hours = Math.floor(remainingMinutes / 60);
    return (hours ? `${hours}h` : '')
      + (minutes ? `${minutes}m` : '')
      + (seconds ? `${seconds}s` : '');
  }

  public static sortById<T extends { id: number }>(array?: T[]): T[] {
    if (array === undefined) return [];
    return [...array].sort((a, b) => a.id - b.id);
  }
}
