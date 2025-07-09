export default class BrowserSdkShared {
    static copy(text: string) {
        // text是复制文本
        // 创建input元素
        const el = document.createElement("input");
        // 给input元素赋值需要复制的文本
        el.setAttribute("value", text);
        // 将input元素插入页面
        document.body.appendChild(el);
        // 选中input元素的文本
        el.select();
        // 复制内容到剪贴板
        document.execCommand("copy");
        // 删除input元素
        document.body.removeChild(el);
        GTip.showTip(["_rs复制成功"]);
    }
}
