import IocContainer from "./IocContainer";

type ClassMetaInfo = WindowMetaInfo;

type WindowMetaInfo = {
    /** 场景窗口 */
    sceneWindow?: {
        /** 打开顺序 */
        openIndex: number;
        /** 属于哪一个场景 */
        kind: "main" | "battle" | "both";
    };
    /** 该窗口打开时预加载的预制体 */
    preloadPrefab?: string[];
};
/** 将类注册到容器中 */
export function registerClass(name: string, metaInfo?: ClassMetaInfo) {
    return function (target: any) {
        IocContainer.set(name, target, metaInfo || {});
    };
}

/**
 * 自动注册事件
 * @param eventList 事件列表
 */
export function message(eventList: (string | symbol)[]): MethodDecorator {
    return (target: Object, propertyName: string, descriptor: PropertyDescriptor) => {
        if (!target.hasOwnProperty("_autoEventMap")) {
            target["_autoEventMap"] = new Map<string, (string | symbol)[]>();
        }
        target["_autoEventMap"].set(propertyName, eventList);
    };
}

/**
 * 自动注入
 * 该装饰器用法类似于 @property
 * @param propertyType 组件类型
 * */
export function autowired(propertyType: typeof cc.Node | typeof cc.Component): PropertyDecorator {
    return (target: Object, propertyName: string) => {
        if (!target.hasOwnProperty("_autowiredMap")) {
            target["_autowiredMap"] = new Map<string, typeof cc.Node | typeof cc.Component>();
        }
        target["_autowiredMap"].set(propertyName, propertyType);
    };
}

/**
 * 防抖
 * @param delay 时间间隔（毫秒）
 * */
export function debounce(delay: number): MethodDecorator {
    return function (target, methodName: string, descriptor: PropertyDescriptor) {
        let oldMethod = descriptor.value;
        let timer = null;
        descriptor.value = function (...args: any[]) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                oldMethod.apply(this, args);
            }, delay);
        };
        return descriptor;
    };
}

/**
 * 节流
 * @param delay 时间间隔（毫秒）
 * */
export function throttle(delay: number): MethodDecorator {
    return function (target, methodName: string, descriptor: PropertyDescriptor) {
        let oldMethod = descriptor.value;
        let lastClickTime = Date.now();
        descriptor.value = function (...args: any[]) {
            if (Date.now() < lastClickTime + delay) {
                return;
            }
            lastClickTime = Date.now();
            oldMethod.apply(this, args);
        };
        return descriptor;
    };
}

const memoryCacheKey = Symbol();
/**
 * 记忆
 * 用于一些计算量比较大并且调用频率较高的方法，将计算结果缓存起来，下次调用时直接返回缓存的结果
 * 使用该装饰器时，方法必须是纯函数，也就说在有相同输入的时候应该有相同的输出
 * */
export function memory(target, methodName: string, descriptor: PropertyDescriptor) {
    let oldMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        if (this[memoryCacheKey] === undefined) {
            this[memoryCacheKey] = {};
        }
        let key = methodName + "[m]" + args.map((a) => JSON.stringify(a)).join("[p]");
        if (this[memoryCacheKey].hasOwnProperty(key)) {
            return this[memoryCacheKey][key];
        }
        let result = oldMethod.apply(this, args);
        this[memoryCacheKey][key] = result;
        return result;
    };
    return descriptor;
}
