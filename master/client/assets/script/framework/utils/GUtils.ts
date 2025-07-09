import { ArrayUtil } from "./ArrayUtils";
import { DateUtil } from "./DateUtils";
import { FileUtils } from "./FileUtils";
import { GameUtils } from "./GameUtils";
import HttpUtils from "./HttpUtils";
import { MapUtil } from "./MapUtils";
import { PathSearchUtils } from "./PathSearchUtils";
import { RandomUtils } from "./RandomUtils";
import SecureUtils from "./SecureUtils";
import { SetUtil } from "./SetUtils";
import { TSUtils } from "./TSUtils";
import { UIUtil } from "./UIUtils";

export default class Utils {
    secure = new SecureUtils();
    array = new ArrayUtil();
    date = new DateUtil();
    map = new MapUtil();
    ts = new TSUtils();
    set = new SetUtil();
    ui = new UIUtil();
    http = new HttpUtils();
    random = new RandomUtils();
    file = new FileUtils();
    pathSearch = new PathSearchUtils();
    game = new GameUtils();
}

window["GUtils"] = new Utils();
declare global {
    /** 工具类 */
    const GUtils: Utils;
}
