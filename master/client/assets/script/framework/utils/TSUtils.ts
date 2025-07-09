export class TSUtils {
    /** 浅拷贝 */
    shallowCopy<T>(obj: T): T {
        if (typeof obj !== "object") return obj;
        if (obj === null) return obj;
        if (obj instanceof Array) {
            const newArr: any = [];
            for (let i = 0; i < obj.length; i++) {
                newArr[i] = this.shallowCopy(obj[i]);
            }
            return newArr;
        }
        const newObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = this.shallowCopy(obj[key]);
            }
        }
        Reflect.setPrototypeOf(newObj, Reflect.getPrototypeOf(obj));
        return newObj;
    }

    showStack() {
        let stack = new Error().stack;
        console.log(stack);
    }
}
