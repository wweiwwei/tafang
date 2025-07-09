if (CC_EDITOR && !Editor.isBuilder) {
    const port = "16691";
    window["EditorLang"] = JSON.parse(cc.sys.localStorage.getItem("EditorLang") || "{}");
    window["EditorAssetIndex"] = JSON.parse(cc.sys.localStorage.getItem("EditorAssetIndex") || "{}");
    let _interval = 0;
    const load = async () => {
        const res1 = await fetch(`http://127.0.0.1:${port}/lang.json?stamp=${Date.now()}`);
        const res2 = await fetch(`http://127.0.0.1:${port}/assetIndex.json?stamp=${Date.now()}`);
        const data1 = await res1.json();
        const data2 = await res2.json();
        cc.log("加载到了多语言及资源索引数据");
        window["EditorLang"] = data1;
        window["EditorAssetIndex"] = data2;
        cc.sys.localStorage.setItem("EditorLang", JSON.stringify(data1));
        cc.sys.localStorage.setItem("EditorAssetIndex", JSON.stringify(data2));
        cc.log("多语言及资源索引初始化完毕");
        GLang.refreshScene();
        let localVersion = Date.now();
        cc.log("启动轮询多语言及资源索引热重载");
        if (_interval) {
            clearInterval(_interval);
            _interval = 0;
        }
        _interval = setInterval(async () => {
            const versionRes = await fetch(`http://127.0.0.1:${port}/version?stamp=${Date.now()}`);
            const { version } = await versionRes.json();
            if (version > localVersion) {
                cc.log("检测到新的多语言及资源索引版本");
                const res1 = await fetch(`http://127.0.0.1:${port}/lang.json?stamp=${Date.now()}`);
                const res2 = await fetch(`http://127.0.0.1:${port}/assetIndex.json?stamp=${Date.now()}`);
                const data1 = await res1.json();
                const data2 = await res2.json();
                cc.log("加载到了多语言及资源索引原始数据");
                window["EditorLang"] = data1;
                window["EditorAssetIndex"] = data2;
                cc.sys.localStorage.setItem("EditorLang", JSON.stringify(data1));
                cc.sys.localStorage.setItem("EditorAssetIndex", JSON.stringify(data2));
                cc.log("已替换多语言和资源索引数据");
                GLang.refreshScene();
                localVersion = Date.now();
            }
        }, 1000);
    };
    load();
}
