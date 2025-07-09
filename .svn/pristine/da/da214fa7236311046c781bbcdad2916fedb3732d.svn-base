export default class HttpUtils {
    /** get，返回文本 */
    async get(url: string, params: any = null): Promise<string> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    resolve(response);
                }
            };
            xhr.onerror = () => {
                reject();
            };
            xhr.open("GET", url, true);
            xhr.send();
        });
    }

    /** post，返回文本 */
    async post(url: string, params: any): Promise<string> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.responseText;
                    resolve(response);
                }
            };
            xhr.onerror = () => {
                reject();
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(params));
        });
    }

    /** 延迟 */
    delay(ms: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    /** 请求二进制文件 */
    async getFile(url: string, params: any = null): Promise<any> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
                const arraybuffer = xhr.response;
                resolve(arraybuffer);
            };
            xhr.onerror = (e) => {
                console.log(e);
                reject();
            };

            xhr.send();
        });
    }

    /** 下载二进制文件 */
    async downloadFile(url: string, retry: number): Promise<any> {
        let response = null;
        for (let i = 0; i < retry; i++) {
            try {
                response = await this.getFile(url);
                console.log(`download ${url} success`);
                return response;
            } catch (error) {
                console.log(error);
                console.log(`download ${url} failed, retry ${i + 1} times`);
                await this.delay(1000);
            }
        }
        throw new Error(`download ${url} failed`);
    }

    /**
     * 批量下载二进制文件，通过回调处理每一个文件，文件太多时这个方法会自动处理下载的滑动窗口
     * @param urls 地址列表
     * @param retryLimit 重试次数
     * @param concurrent 并发下载数
     * @param cb 文件下载完时的处理
     *
     * */
    async downloadFileBatchWithCallBack(
        urls: string[],
        retryLimit: number,
        concurrent: number,
        cb: (ok: boolean, file: any, url: string) => void
    ): Promise<{ allOk: boolean; hasComplete: number; failList: string[] }> {
        const d = new BatchDownloadManager(urls, retryLimit, concurrent, cb);
        await d.start();
        return {
            allOk: d.hasFailedDownload.length === 0,
            hasComplete: urls.length - d.hasFailedDownload.length,
            failList: d.hasFailedDownload,
        };
    }

    /** 下载文本文件 */
    async downloadText(url: string, retry: number): Promise<any> {
        let response = null;
        for (let i = 0; i < retry; i++) {
            try {
                response = await this.get(url);
                console.log(`download ${url} success`);
                return response;
            } catch (error) {
                console.log(error);
                console.log(`download ${url} failed, retry ${i + 1} times`);
                await this.delay(1000);
            }
        }
        throw new Error(`download ${url} failed`);
    }

    /** 文件是否存在 */
    async exist(url: string): Promise<boolean> {
        try {
            const length = await this.getContentLength(url);
            return length > 0;
        } catch (e) {
            return false;
        }
    }

    /** 获取文件大小 */
    async getContentLength(url: string): Promise<number> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    const length = xhr.getResponseHeader("content-length");
                    resolve(Number(length));
                } else if (xhr.readyState == 4 && xhr.status >= 400) {
                    reject();
                }
            };
            xhr.onerror = () => {
                reject();
            };
            xhr.open("HEAD", url, true);
            xhr.send();
        });
    }
}

class BatchDownloadManager {
    constructor(
        public urls: string[],
        public retryLimit: number,
        public concurrent: number,
        public cb: (ok: boolean, file: any, url: string) => void
    ) {}
    public allOk: boolean = false;
    public state: "notBegin" | "notFinish" | "finish" = "notBegin";

    private remainDownload: string[] = [];
    private downloading: string[] = [];
    public hasCompleteDownload: string[] = [];
    public hasFailedDownload: string[] = [];

    private completeResolve: () => void;
    start() {
        this.state = "notFinish";
        return new Promise<void>((resolve, reject) => {
            this.completeResolve = resolve;
            this.remainDownload = this.urls.map((e) => e);
            for (let i = 0; i < this.concurrent; i++) {
                this.next();
            }
        });
    }

    private async pipe(url: string) {
        this.downloading.push(url);
        const d = new GameDownloader(url, this.retryLimit);
        d.start((ok: boolean, file: any, d: GameDownloader) => {
            if (ok) {
                this.complete(url);
            } else {
                this.fail(url);
            }
            this.cb(ok, file, d.url);
        });
    }

    private complete(url: string) {
        this.downloading = this.downloading.filter((e) => e !== url);
        this.hasCompleteDownload.push(url);
        this.check();
    }

    private fail(url: string) {
        this.downloading = this.downloading.filter((e) => e !== url);
        this.hasFailedDownload.push(url);
        this.check();
    }

    private check() {
        if (this.remainDownload.length === 0 && this.downloading.length === 0) {
            this.state = "finish";
            this.completeResolve();
        } else {
            this.next();
        }
    }

    private next() {
        if (this.remainDownload.length > 0) {
            const url = this.remainDownload.pop();
            this.pipe(url);
        }
    }
}

class GameDownloader {
    public retry = 0;
    public state: "notBegin" | "notFinish" | "ok" | "fail" = "notBegin";
    public data: any;
    constructor(public url: string, public retryLimit: number) {}

    async start(onComplete: (ok: boolean, file: any, d: GameDownloader) => void) {
        GLog.debug(`下载文件，url:${this.url}`);
        this.state = "notFinish";
        const ok = await this.pipe();
        GLog.debug(`下载文件结束，ok:${ok} url:${this.url}`);
        if (ok) {
            this.state = "ok";
        } else {
            this.state = "fail";
        }
        onComplete(ok, this.data, this);
    }

    private async pipe() {
        for (let i = 0; i < this.retryLimit; i++) {
            try {
                this.data = await GUtils.http.getFile(this.url);
                return true;
            } catch {
                this.retry++;
            }
        }
        return false;
    }
}
