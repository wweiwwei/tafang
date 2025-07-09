/** 提供跟内置的Date相似的接口，但获取的月份，日期，小时等都将锁定在当前游戏设定的时区，需要在游戏服务器登录之后才能获取服务器时间 */
export class GameDate {
    private _date: Date;
    private _stamp: number;

    public static readonly OneSecond: number = 1000;
    public static readonly OneMinute: number = 60000;
    public static readonly OneHour: number = 3600000;
    public static readonly OneDay: number = 86400000;
    public static readonly OneWeek: number = 86400000 * 7;
    // 当前时区相对于格林威治时间的偏差，用于计算是否超过0点；当前为北京时间，东八区
    public static readonly TimeArea: number = 28800000;

    /** 当前时间，从服务器获取的时间戳，注意该时间戳刷新频率并不高，但还是可以应用于大部分业务 */
    public static now() {
        return GState.data.time;
    }
    /** 如果发现now()方法的更新频率不够高，可以使用该时间戳，在服务器获取的时间戳基础上，通过update来更新时间戳，可以实现一些对时间更新频率要求较高的业务 */
    public static nowUpdated() {
        return GState.data.time + GState.updatedStampOffset;
    }
    public static gameSeconds() {
        let gameSecond = (this.now() / 1000) % 720;
        return gameSecond;
    }
    public static gameHours() {
        let gameSecond = this.gameSeconds();
        return Math.floor(gameSecond / 30);
    }
    public static gameTimeMatch() {
        let step = "";
        let gameH = this.gameHours();
        if (gameH >= 24 || gameH < 6) step = "sleep";
        if (gameH >= 6 && gameH < 12) step = "work_1";
        if (gameH >= 12 && gameH < 15) step = "food_1";
        if (gameH >= 15 && gameH < 21) step = "work_2";
        if (gameH >= 21 && gameH < 24) step = "food_2";
        return step;
    }
    public static gameDayProgress(): number {
        return this.gameSeconds() / 720;
    }
    public static gameTimeLight() {
        let gameDesc = this.gameTimeMatch();
        if (gameDesc == "sleep") return [0, 2, 4, 6];
        if (gameDesc.split("_")[0] == "food" && gameDesc.split("_")[1] == "1") return [12, 14];
        if (gameDesc.split("_")[0] == "food" && gameDesc.split("_")[1] == "2") return [22, 0];
        if (gameDesc.split("_")[0] == "work" && gameDesc.split("_")[1] == "1") return [6, 8, 10, 12];
        if (gameDesc.split("_")[0] == "work" && gameDesc.split("_")[1] == "2") return [16, 18, 20];
        return [];
    }
    public static gameTimeTag() {
        let gameDesc = this.gameTimeMatch();
        if (gameDesc == "sleep") return "01";
        if (gameDesc.split("_")[0] == "work" && gameDesc.split("_")[1] == "1") return "02";
        if (gameDesc.split("_")[0] == "work" && gameDesc.split("_")[1] == "2") return "04";
        if (gameDesc.split("_")[0] == "food" && gameDesc.split("_")[1] == "1") return "03";
        if (gameDesc.split("_")[0] == "food" && gameDesc.split("_")[1] == "2") return "05";
        return "";
    }

    /** 通过时间戳构造 */
    constructor(timeStamp?: number) {
        if (!timeStamp) timeStamp = GState.data.time;
        this._stamp = timeStamp;
        this._date = new Date(timeStamp + GameDate.TimeArea);
    }

    /** 这个月的第几号 */
    getDate() {
        return this._date.getUTCDate();
    }
    /** 星期几，0代表星期天，6代表星期六 */
    getDay() {
        return this._date.getUTCDay();
    }
    /** 年 */
    getFullYear() {
        return this._date.getUTCFullYear();
    }
    /** 小时 */
    getHours() {
        return this._date.getUTCHours();
    }
    /** 毫秒 */
    getMilliseconds() {
        return this._date.getUTCMilliseconds();
    }
    /** 分钟 */
    getMinutes() {
        return this._date.getUTCMinutes();
    }
    /** 月份，注意这里保持和Date接口一致，所以0代表1月，11代表12月 */
    getMonth() {
        return this._date.getUTCMonth();
    }
    /** 秒 */
    getSeconds() {
        return this._date.getUTCSeconds();
    }
    /** 时间戳 */
    getTime() {
        return this._stamp;
    }
    /** 今天已经经过的毫秒数 */
    todayHasPassMillisecond() {
        return (this._stamp + GameDate.TimeArea) % GameDate.OneDay;
    }
    /** 今天剩余的毫秒数 */
    todayRemainMillisecond() {
        return GameDate.OneDay - this.todayHasPassMillisecond();
    }
    /** 今天0点的时间戳 */
    todayStartTime() {
        return this._stamp - this.todayHasPassMillisecond();
    }
    /** 本月1号0点的时间戳 */
    thisMonthBeginTime() {
        const day = this.getDate();
        return this._stamp - (day - 1) * GameDate.OneDay - this.todayHasPassMillisecond();
    }
    /** 获取本月n号0点的时间戳 */
    thisMonthTimeByDay(day: number) {
        return this.thisMonthBeginTime() + GameDate.OneDay * (day - 1);
    }
    format(format = "YY-MM-DD hh:mm:ss") {
        let year = this.getFullYear();
        let month = this.getMonth() + 1; //月份是从0开始的
        let day = this.getDate();
        let hour = this.getHours();
        let min = this.getMinutes();
        let sec = this.getSeconds();
        let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
            return "0" + index;
        });

        let newTime = format
            .replace(/YY/g, year.toString())
            .replace(/MM/g, preArr[month] || month)
            .replace(/DD/g, preArr[day] || day)
            .replace(/hh/g, preArr[hour] || hour)
            .replace(/mm/g, preArr[min] || min)
            .replace(/ss/g, preArr[sec] || sec);

        return newTime;
    }
    /** 获取小时和分钟*/
    public static formatToHHMM(millisecond: number) {
        const hour = Math.floor(millisecond / this.OneHour);
        const minute = Math.floor((millisecond / this.OneMinute) % 60);
        return { hour: hour, minute: minute };
    }
}
