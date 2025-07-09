import { SdkReportEventName } from "../shared/SdkReportEventName";

export default abstract class BaseSDK {
    /** 是否测试环境 */
    isTest: boolean = false;
    /** 当前sdk渠道，不可为空 */
    sdkChannel: string = "";
    /** sdk账号唯一id，不可为空 */
    sdkUid: string = "";
    /** sdk额外标识，备用，可以为空 */
    sdkExtra: string = "";
    /** 账号存储的额外信息 */
    extraInfo: string = "{}";
    /** 额外参数 */
    extraParam: string = "{}";
    /** 货币编号 */
    abstract currencyCode: CurrencyCode;
    /** 包名 */
    abstract getPackageName(): string;
    /** 初始化 */
    abstract sdkInit(): Promise<void>;
    /** sdk登录，初始化sdkChannel，sdkUid，sdkExtra */
    abstract sdkLogin(): Promise<void>;
    /** 进入主场景 */
    async enterMainScene(): Promise<void> {}
    /** 展示视频实现 */
    abstract showVideoImpl(videoType: string): Promise<void>;
    /** 支付实现 */
    abstract payImpl(
        itemId: number,
        extra: string
    ): Promise<{
        orderId: string;
    }>;
    /** 打点 */
    abstract report(data: SdkReportEventName): Promise<void>;
    /** 震屏 */
    abstract shockScreen(): void;
    /** 复制到剪切板 */
    abstract copyToClipboard(text: string): void;
    /** 信息安全检查 */
    async msgCheck(content: string): Promise<boolean> {
        return true;
    }
}
