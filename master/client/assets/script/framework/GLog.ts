export class LogHelper {
    logLevel: number = 4;

    verbose(...args: any[]) {
        if (this.logLevel < 5) {
            return;
        }
        console.log("VERBOSE", ...args);
    }

    debug(...args: any[]) {
        if (this.logLevel < 4) {
            return;
        }
        console.log("DEBUG", ...args);
    }

    info(...args: any[]) {
        if (this.logLevel < 3) {
            return;
        }
        console.log("INFO", ...args);
    }

    warn(...args: any[]) {
        if (this.logLevel < 2) {
            return;
        }
        console.warn("WARN", ...args);
    }

    error(...args: any[]) {
        if (this.logLevel < 1) {
            return;
        }
        console.error("ERROR", ...args);
    }
}

window["GLog"] = new LogHelper();

declare global {
    /** 日志管理类 */
    const GLog: LogHelper;
}
