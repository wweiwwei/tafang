module.exports = {
    "set-lang": function (event, langCode) {
        Editor.log("set lang : " + langCode);
        if (GLang) {
            GLang.setCode(langCode);
        } else {
            Editor.log("can't find GLang");
        }
    },
    "load-lang": function (event) {},
};
