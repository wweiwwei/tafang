export class DateUtil {
    readonly OneSecond: number = 1000;
    readonly OneMinute: number = 60000;
    readonly OneHour: number = 3600000;
    readonly OneDay: number = 86400000;
    readonly OneWeek: number = 86400000 * 7;

    formatRemainTime(millisecond: number, format = "DD hh:mm:ss") {
        const padZero = (str: string) => {
            if (str.length === 1) {
                return "0" + str;
            } else {
                return str;
            }
        };
        const day = Math.floor(millisecond / this.OneDay);
        const hour = Math.floor((millisecond / this.OneHour) % 24);
        const minute = Math.floor((millisecond / this.OneMinute) % 60);
        const second = new Date(millisecond).getSeconds();
        const dayStr = day.toString();
        const hourStr = padZero(hour.toString());
        const minuteStr = padZero(minute.toString());
        const secondStr = padZero(second.toString());
        return format
            .replace(/DD/g, dayStr)
            .replace(/hh/g, hourStr)
            .replace(/mm/g, minuteStr)
            .replace(/ss/g, secondStr);
    }
}
