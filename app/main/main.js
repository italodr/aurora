require("source-map-support/source-map-support.js").install();
module.exports=function(e){var o={};function t(r){if(o[r])return o[r].exports;var n=o[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=o,t.d=function(e,o,r){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o,t){t(1),e.exports=t(2)},function(e,o){e.exports=require("babel-polyfill")},function(e,o,t){"use strict";var r=t(3),n=u(t(4)),l=u(t(8));function u(e){return e&&e.__esModule?e:{default:e}}var a=!1;var s=void 0;function i(){var e=new r.BrowserWindow("darwin"===l.default.platform()?{frame:!1,titleBarStyle:"hiddenInset"}:{}),o=a?"http://localhost:"+process.env.ELECTRON_WEBPACK_WDS_PORT:"file://"+__dirname+"/index.html";return a&&e.webContents.openDevTools(),e.loadURL(o),e.on("closed",function(){s=null}),e.webContents.on("devtools-opened",function(){e.focus(),setImmediate(function(){e.focus()})}),e}r.app.on("window-all-closed",function(){"darwin"!==process.platform&&r.app.quit()}),r.app.on("activate",function(){null===s&&(s=i())}),r.app.on("ready",function(){s=i(),(0,n.default)(r.app,r.Menu,s)})},function(e,o){e.exports=require("electron")},function(e,o,t){"use strict";var r=l(t(5)),n=l(t(6));function l(e){return e&&e.__esModule?e:{default:e}}e.exports=function(e,o,t){var l=(0,r.default)(e);l.push({label:"Mutations",submenu:[{label:"Add New Mutation",click:function(){n.default.sendScreenChange(t,"store")}}]});var u=o.buildFromTemplate(l);o.setApplicationMenu(u)}},function(e,o,t){"use strict";e.exports=function(e){var o=[{label:"Edit",submenu:[{role:"undo"},{role:"redo"},{type:"separator"},{role:"cut"},{role:"copy"},{role:"paste"},{role:"pasteandmatchstyle"},{role:"delete"},{role:"selectall"}]},{label:"View",submenu:[{role:"reload"},{role:"forcereload"},{role:"toggledevtools"},{type:"separator"},{role:"resetzoom"},{role:"zoomin"},{role:"zoomout"},{type:"separator"},{role:"togglefullscreen"}]},{role:"window",submenu:[{role:"minimize"},{role:"close"}]}];return"darwin"===process.platform&&(o.unshift({label:e.getName(),submenu:[{role:"about"},{type:"separator"},{role:"services",submenu:[]},{type:"separator"},{role:"hide"},{role:"hideothers"},{role:"unhide"},{type:"separator"},{role:"quit"}]}),o[1].submenu.push({type:"separator"},{label:"Speech",submenu:[{role:"startspeaking"},{role:"stopspeaking"}]}),o[3].submenu=[{role:"close"},{role:"minimize"},{role:"zoom"},{type:"separator"},{role:"front"}]),o}},function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r,n=t(7),l=(r=n)&&r.__esModule?r:{default:r};o.default={sendScreenChange:function(e,o){e.webContents.send(l.default.CHANGE_SCREEN,o)}}},function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={CHANGE_SCREEN:"CHANGE_SCREEN"}},function(e,o){e.exports=require("os")}]);
//# sourceMappingURL=main.js.map