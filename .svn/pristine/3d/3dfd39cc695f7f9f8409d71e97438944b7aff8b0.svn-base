var webgl_canvas = null;

LiteGraph.node_images_path = "../nodes_data/";

var editor = new LiteGraph.Editor("main", { miniwindow: false });
window.graphcanvas = editor.graphcanvas;
window.graph = editor.graph;
window.addEventListener("resize", function () { editor.graphcanvas.resize(); });
//window.addEventListener("keydown", editor.graphcanvas.processKey.bind(editor.graphcanvas) );
window.onbeforeunload = function () {
	var data = JSON.stringify(graph.serialize());
	localStorage.setItem("litegraphg demo backup", data);
}

//enable scripting
LiteGraph.allow_scripts = true;

//test
//editor.graphcanvas.viewport = [200,200,400,400];

//create scene selector
var elem = document.createElement("span");
elem.id = "LGEditorTopBarSelector";
elem.className = "selector";
elem.innerHTML = "";
elem.innerHTML += `文件名 <input id='fileName'/>
<button class='btn' id='loadFile'>加载文件</button>
<button class='btn' id='saveFile'>保存文件</button>
<button class='btn' id='newFile'>新建文件</button>
`;
editor.tools.appendChild(elem);
elem.querySelector("#loadFile").addEventListener("click", async () => {
	const input = elem.querySelector("#fileName").value
	$.confirm({
		// theme: 'dark',
		title: `读取${input}?`,
		content: '读取后将覆盖当前界面，请注意及时保存',
		type: 'green',
		buttons: {
			ok: {
				text: "确定",
				btnClass: 'btn-primary',
				keys: ['enter'],
				action: async () => {
					const res = await fetch(`http://127.0.0.1:16688/getBattleSkillFile/${input}`)
					const data = await res.json()
					if (data) graph.configure(data)
					console.log("load file");
				}
			},
			cancel: function () {
				console.log('the user clicked cancel');
			}
		}
	});
});

elem.querySelector("#saveFile").addEventListener("click", async () => {
	const input = elem.querySelector("#fileName").value
	$.confirm({
		// theme: 'dark',
		title: `保存${input}?`,
		content: '保存后原文件将被覆盖',
		type: 'green',
		buttons: {
			ok: {
				text: "确定",
				btnClass: 'btn-primary',
				keys: ['enter'],
				action: async () => {
					const data = JSON.stringify(graph.serialize());
					const res = await fetch(`http://127.0.0.1:16688/writeBattleSkillFile/${input}`, {
						method: "post",
						body: data,
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await res.json()
					if (result) {
						console.log("save file");
					}
				}
			},
			cancel: function () {
				console.log('the user clicked cancel');
			}
		}
	});
});


elem.querySelector("#newFile").addEventListener("click", async () => {
	$.confirm({
		// theme: 'dark',
		title: `新建文件?`,
		content: '未保存内容将会丢失，请注意及时保存',
		type: 'green',
		buttons: {
			ok: {
				text: "确定",
				btnClass: 'btn-primary',
				keys: ['enter'],
				action: () => {
					window.location.reload();
				}
			},
			cancel: function () {
				console.log('the user clicked cancel');
			}
		}
	});

});

// var select = elem.querySelector("select");
// select.addEventListener("change", function (e) {
// 	var option = this.options[this.selectedIndex];
// 	var url = option.dataset["url"];

// 	if (url)
// 		graph.load(url);
// 	else if (option.callback)
// 		option.callback();
// 	else
// 		graph.clear();
// });

// elem.querySelector("#save").addEventListener("click", function () {
// 	console.log("saved");
// 	localStorage.setItem("graphdemo_save", JSON.stringify(graph.serialize()));
// });

// elem.querySelector("#load").addEventListener("click", async () => {
// 	var data = localStorage.getItem("graphdemo_save");
// 	if (data)
// 		graph.configure(JSON.parse(data));
// 	console.log("loaded");
// });

// elem.querySelector("#download").addEventListener("click", function () {
// 	var data = JSON.stringify(graph.serialize());
// 	var file = new Blob([data]);
// 	var url = URL.createObjectURL(file);
// 	var element = document.createElement("a");
// 	element.setAttribute('href', url);
// 	const input = elem.querySelector("#loadFileName").value
// 	element.setAttribute('download', `${input}.json`);
// 	element.style.display = 'none';
// 	document.body.appendChild(element);
// 	element.click();
// 	document.body.removeChild(element);
// 	setTimeout(function () { URL.revokeObjectURL(url); }, 1000 * 60); //wait one minute to revoke url	
// });

// elem.querySelector("#webgl").addEventListener("click", enableWebGL);
// elem.querySelector("#multiview").addEventListener("click", function () { editor.addMultiview() });