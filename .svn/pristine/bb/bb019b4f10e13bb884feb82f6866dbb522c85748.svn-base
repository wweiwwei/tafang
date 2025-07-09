"use strict";

import * as ZSOpenCore from "./zsOpenCore.min.wx.js";
wx["ZSOpenCore"] = ZSOpenCore;

let createCanvas = wx.createCanvas;
wx.__first__canvas = createCanvas();
let first = true;
wx.createCanvas = function () {
    if (first) {
        first = false;
        return wx.__first__canvas;
    } else {
        return createCanvas();
    }
};
const data = wx.getSystemInfoSync();
const isMobile = "windows" !== data.platform && "devtools" !== data.platform;
if (isMobile) {
    const first_scene = require("./first-screen.js");
    first_scene.drawImg("first.jpg");
}
wx.loadSubpackage({
    name: "engine",
    success: () => {},
});
