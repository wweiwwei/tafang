"use strict";

module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        zh_chs() {
            Editor.Scene.callSceneScript("multi-lang", "set-lang", "zh_chs");
        },
        zh_cht() {
            Editor.Scene.callSceneScript("multi-lang", "set-lang", "zh_cht");
        },
        en() {
            Editor.Scene.callSceneScript("multi-lang", "set-lang", "en");
        },
    },
};
