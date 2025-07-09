export default class AndroidSdkShared {
    private static AppClass = "org/cocos2dx/javascript/HandsomeAppActivity";

    static nativeVersion(): string {
        return this.callNative(this.AppClass, "nativeVersion");
    }
    static getSdkName(): string {
        return this.callNative(this.AppClass, "getSdkName");
    }

    static getPackageName(): string {
        return this.callNative(this.AppClass, "getPackName");
    }

    static copyToClipboard(text: string) {
        jsb.reflection.callStaticMethod(this.AppClass, "setClipData", "(Ljava/lang/String;)Ljava/lang/String;", text);
    }

    static vibrate() {
        return this.callNative(this.AppClass, "vibrate");
    }

    static callNative(appClass: string, method: string, param: any = undefined): any {
        const p = param === undefined ? "" : JSON.stringify(param);
        return jsb.reflection.callStaticMethod(appClass, method, "(Ljava/lang/String;)Ljava/lang/String;", p);
    }
}
