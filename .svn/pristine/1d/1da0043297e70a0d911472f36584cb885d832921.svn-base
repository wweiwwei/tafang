let fs = require("fs");
let Path = require("path");
let { commonUsePrefab, allPrefabShowInfo } = require("./config");
/**工程目录 */
let ProjectPath = Editor.Project.path.replace(/\\/g, "/");

/**当前所有预制的信息
 * @type arrary
 */
let allPrefabInfo = null;

/**加载所有的预制获取其信息 */
const loadAllPrefab = () => {
    if (allPrefabInfo) return;
    allPrefabInfo = [];
    //获取 commonUsePrefab 目录下面所有预制的uuid和名字信息
    let commonUsePrefabAbsPath = Path.join(ProjectPath, commonUsePrefab);
    let info = fs.readdirSync(commonUsePrefabAbsPath);
    for (let one of info) {
        if (one.endsWith(".meta")) {
            let name = one.split(".")[0];
            let uuid = JSON.parse(fs.readFileSync(Path.join(commonUsePrefabAbsPath, one))).uuid;
            allPrefabInfo.push({ name, uuid });
        }
    }
};

module.exports = {
    load() {
        //加载所有的预制并获取其信息
        loadAllPrefab();
        //绑定菜单
        if (!Editor.Menu["__commonUsePrefab__"]) {
            Editor.Menu["__commonUsePrefab__"] = true;
            //改变菜单
            let orginMenu = Editor.Menu;
            let hookFunc = this.hookMenuFunc.bind(this);
            const menu = function () {
                hookFunc(...arguments);
                return new orginMenu(...arguments);
            };
            let menuProps = Object.getOwnPropertyNames(orginMenu);
            for (let prop of menuProps) {
                const object = Object.getOwnPropertyDescriptor(orginMenu, prop);
                if (object.writable) {
                    menu[prop] = orginMenu[prop];
                }
            }
            menu.prototype = orginMenu.prototype;
            Editor.Menu = menu;
        }
    },

    unload() {
        // execute when package unloaded
    },

    hookMenuFunc(template) {
        //获取当前选中的节点的id，并作为添加的节点的父节点
        const submenu = template[0]?.submenu;
        if (Array.isArray(submenu)) {
            const params = submenu[0]?.params;
            if (Array.isArray(params)) {
                const nodeId = params[2];
                if (nodeId) {
                    //新菜单
                    let newMenu = {
                        label: "创建自定义节点",
                        enabled: true,
                        submenu: [],
                    };
                    //按照配置排序
                    for (let key of Object.keys(allPrefabShowInfo)) {
                        let find = allPrefabInfo.find((one) => one.name === key);
                        if (find) {
                            let { name, uuid } = find;
                            //子页签名字
                            let label = name;
                            if (allPrefabShowInfo[name]) {
                                label = `${name}（${allPrefabShowInfo[name]}）`;
                            }
                            newMenu.submenu.push({
                                label,
                                click: () => {
                                    Editor.Ipc.sendToPanel("scene", "scene:create-node-by-prefab", name, uuid, nodeId);
                                },
                            });
                        }
                    }
                    //当做第一个菜单
                    template.unshift(newMenu);
                }
            }
        }
    },

    messages: {},
};
