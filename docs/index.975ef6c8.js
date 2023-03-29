// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jC2qd":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8lqZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _rectangle = require("./rectangle");
var _rectangleDefault = parcelHelpers.interopDefault(_rectangle);
var _circle = require("./circle");
var _circleDefault = parcelHelpers.interopDefault(_circle);
var _quadTree = require("./quad-tree");
var _quadTreeDefault = parcelHelpers.interopDefault(_quadTree);
var _polygon = require("./polygon");
var _polygonDefault = parcelHelpers.interopDefault(_polygon);
//config
// var shapeCount = 300
var shapeCount = 300 // x3
;
var shapeSize = 5;
var shapeSpeed = 1;
var circlesEnable = true;
var trianglesEnable = true;
var pentagonEnable = true;
var isQuadTreeCollision = true;
var collisionFuncPtr = isQuadTreeCollision ? quadTreeCollision : lazyCollision;
var isDrawTree = false;
//
const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
const gameState = {};
var tree = new (0, _quadTreeDefault.default)(new (0, _rectangleDefault.default)(0, 0, canvas.width, canvas.height), 4);
function queueUpdates(numTicks) {
    for(let i = 0; i < numTicks; i++){
        gameState.lastTick = gameState.lastTick + gameState.tickLength;
        update(gameState.lastTick);
    }
}
function drawTree(tree) {
    if (!tree._hasChildren) {
        context.strokeStyle = "red";
        const rect = tree._boundary;
        context.strokeRect(rect.x, rect.y, rect.w, rect.h);
    } else {
        drawTree(tree._children[0]);
        drawTree(tree._children[1]);
        drawTree(tree._children[2]);
        drawTree(tree._children[3]);
    }
}
function draw(tFrame) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = "black"
    // context.fillRect(0, 0, canvas.width, canvas.height)
    gameState.rects.forEach((rect)=>{
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.w, rect.h);
    });
    gameState.circles.forEach((circle)=>{
        context.beginPath();
        context.fillStyle = circle.color;
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    });
    gameState.polygons.forEach((triangle)=>{
        context.beginPath();
        context.fillStyle = triangle.color;
        context.moveTo(triangle.points[0].x + triangle.x, triangle.points[0].y + triangle.y);
        triangle.points.forEach((point)=>{
            context.lineTo(point.x + triangle.x, point.y + triangle.y);
        });
        context.fill();
        context.closePath();
    });
    // context.beginPath()
    // context.fillStyle = "red"
    // context.fillRect(gameState.cursor.x, gameState.cursor.y, 5, 5)
    // context.closePath()
    if (isQuadTreeCollision && isDrawTree) drawTree(tree);
    let currentShapeCount = gameState.circles.length + gameState.polygons.length;
    context.fillStyle = "blue";
    context.font = "bold 16px Arial";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText("max: " + shapeCount * 3, 30, 30);
    context.fillText("now: " + currentShapeCount, 30, 50);
    gameState.buttons.forEach((button)=>{
        context.fillStyle = button.rect.color;
        context.fillRect(button.rect.x, button.rect.y, button.rect.w, button.rect.h);
        context.fillStyle = "black";
        context.font = "bold 16px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(button.text, button.rect.x + button.rect.w / 2, button.rect.y + button.rect.h / 2);
    });
}
function isCirclePolygonIntersects(circle, triangle) {
    // first check AABB at the intersection for optimization
    if (!circle.rect.intersects(triangle.rect)) return false;
    for(let i = 0; i < triangle.points.length; i++){
        // the algorithm is borrowed from:
        // https://math.stackexchange.com/questions/311921/get-location-of-vector-circle-intersection
        let p = {
            x: triangle.points[i].x,
            y: triangle.points[i].y
        };
        let v = triangle._vectors[i];
        p.x += triangle.x;
        p.y += triangle.y;
        let a = v.x * v.x + v.y * v.y;
        let b = 2 * v.x * (p.x - circle.x) + 2 * v.y * (p.y - circle.y);
        let c = Math.pow(p.x - circle.x, 2) + Math.pow(p.y - circle.y, 2) - circle.radius * circle.radius;
        let d = b * b - 4 * a * c;
        if (d < 0) continue;
        d = Math.sqrt(d);
        // let t1 = 2 * c / (-b + d)
        let t1 = (-b - d) / (2 * a);
        let t2 = (-b + d) / (2 * a);
        if (t1 > 0 && t1 < 1 || t2 > 0 && t2 < 1) return true;
    }
    return triangle.contains(circle);
}
function resolveCollision(figure1, figure2) {
    let speed = figure1.speed;
    figure1.speed = figure2.speed;
    figure2.speed = speed;
    figure1.takeDamage();
    figure2.takeDamage();
}
function processDeletionQueue() {
    gameState.circleDeletionQueue.forEach((circle)=>{
        let index = gameState.circles.indexOf(circle);
        if (index > 0) gameState.circles.splice(index, 1);
    });
    gameState.circleDeletionQueue = [];
    gameState.polygonDeletionQueue.forEach((polygon)=>{
        let index = gameState.polygons.indexOf(polygon);
        if (index > 0) gameState.polygons.splice(index, 1);
    });
    gameState.polygonDeletionQueue = [];
}
function lazyCollision() {
    // first check AABB at the intersection for optimization
    let isAabbIntersects = (shape1, shape2)=>shape1.rect.intersects(shape2.rect);
    // circle vs circle
    for(let i = 0; i < gameState.circles.length - 1; i++){
        let circle1 = gameState.circles[i];
        for(let j = i + 1; j < gameState.circles.length; j++){
            let circle2 = gameState.circles[j];
            if (isAabbIntersects(circle1, circle2)) {
                if (circle1.intersects(circle2)) {
                    resolveCollision(circle1, circle2);
                    if (circle2.health <= 0) {
                        gameState.circles.splice(j, 1);
                        j -= 1;
                    }
                    if (circle1.health <= 0) {
                        gameState.circles.splice(i, 1);
                        i -= 0;
                        break;
                    }
                }
            }
        }
    }
    //polygon vs polygon
    for(let i = 0; i < gameState.polygons.length - 1; i++){
        let polygon1 = gameState.polygons[i];
        for(let j = i + 1; j < gameState.polygons.length; j++){
            let polygon2 = gameState.polygons[j];
            if (isAabbIntersects(polygon1, polygon2)) {
                if (polygon1.intersects(polygon2)) {
                    resolveCollision(polygon1, polygon2);
                    if (polygon2.health <= 0) {
                        gameState.polygons.splice(j, 1);
                        j -= 1;
                    }
                    if (polygon1.health <= 0) {
                        gameState.polygons.splice(i, 1);
                        i -= 1;
                        break;
                    }
                }
            }
        }
    }
    // circle vs polygon
    for(let i = 0; i < gameState.circles.length; i++){
        let circle = gameState.circles[i];
        for(let j = 0; j < gameState.polygons.length; j++){
            let polygon = gameState.polygons[j];
            if (isAabbIntersects(circle, polygon)) {
                if (isCirclePolygonIntersects(circle, polygon)) {
                    resolveCollision(circle, polygon);
                    if (polygon.health <= 0) {
                        gameState.polygons.splice(j, 1);
                        j -= 1;
                    }
                    if (circle.health <= 0) {
                        gameState.circles.splice(i, 1);
                        i -= 1;
                        break;
                    }
                }
            }
        }
    }
}
function quadTreeCollision() {
    // QuadTree.valueCount = 0
    tree.clear();
    processDeletionQueue();
    gameState.circles.forEach((circle)=>tree.insert(circle));
    gameState.polygons.forEach((polygon)=>tree.insert(polygon));
    tree.findIntersections((shape1, shape2)=>{
        if (shape1 instanceof (0, _circleDefault.default) && shape2 instanceof (0, _circleDefault.default)) {
            if (shape1.intersects(shape2)) {
                resolveCollision(shape1, shape2);
                // console.log("circle vs circle collision")
                if (shape1.health <= 0) gameState.circleDeletionQueue.push(shape1);
                if (shape2.health <= 0) gameState.circleDeletionQueue.push(shape2);
            }
        } else if (shape1 instanceof (0, _polygonDefault.default) && shape2 instanceof (0, _polygonDefault.default)) {
            if (shape1.intersects(shape2)) {
                resolveCollision(shape1, shape2);
                // console.log("polygon vs polygon collision")
                if (shape1.health <= 0) gameState.polygonDeletionQueue.push(shape1);
                if (shape2.health <= 0) gameState.polygonDeletionQueue.push(shape2);
            }
        } else if (shape1 instanceof (0, _circleDefault.default) && shape2 instanceof (0, _polygonDefault.default)) {
            if (isCirclePolygonIntersects(shape1, shape2)) {
                resolveCollision(shape1, shape2);
                // console.log("circle vs polygon collision")
                if (shape1.health <= 0) gameState.circleDeletionQueue.push(shape1);
                if (shape2.health <= 0) gameState.polygonDeletionQueue.push(shape2);
            }
        } else if (shape1 instanceof (0, _polygonDefault.default) && shape2 instanceof (0, _circleDefault.default)) {
            if (isCirclePolygonIntersects(shape2, shape1)) {
                resolveCollision(shape1, shape2);
                if (shape1.health <= 0) gameState.polygonDeletionQueue.push(shape1);
                if (shape2.health <= 0) gameState.circleDeletionQueue.push(shape2);
            // console.log("Polygon vs Circle collision")
            }
        }
    });
}
function update(tick) {
    collisionFuncPtr();
    gameState.rects.forEach((figure)=>{
        figure.x += figure.speed.x;
        figure.y += figure.speed.y;
        if (figure.x <= 0) figure.speed.x = Math.abs(figure.speed.x);
        else if (figure.x >= canvas.width) figure.speed.x = -Math.abs(figure.speed.x);
        if (figure.y <= 0) figure.speed.y = Math.abs(figure.speed.y);
        else if (figure.y >= canvas.height) figure.speed.y = -Math.abs(figure.speed.y);
    });
    gameState.circles.forEach((circle)=>{
        circle.x += circle.speed.x;
        circle.y += circle.speed.y;
        if (circle.x - circle.radius <= 0) circle.speed.x = Math.abs(circle.speed.x);
        else if (circle.x + circle.radius >= canvas.width) circle.speed.x = -Math.abs(circle.speed.x);
        if (circle.y - circle.radius <= 0) circle.speed.y = Math.abs(circle.speed.y);
        else if (circle.y + circle.radius >= canvas.height) circle.speed.y = -Math.abs(circle.speed.y);
    });
    gameState.polygons.forEach((polygon)=>{
        polygon.x += polygon.speed.x;
        polygon.y += polygon.speed.y;
        if (polygon.x - polygon.size / 2 <= 0) polygon.speed.x = Math.abs(polygon.speed.x);
        else if (polygon.x + polygon.size / 2 >= canvas.width) polygon.speed.x = -Math.abs(polygon.speed.x);
        if (polygon.y - polygon.size / 2 <= 0) polygon.speed.y = Math.abs(polygon.speed.y);
        else if (polygon.y + polygon.size / 2 >= canvas.height) polygon.speed.y = -Math.abs(polygon.speed.y);
    });
}
function run(tFrame) {
    canvas.addEventListener("mousemove", (e)=>gameState.cursor = {
            x: e.pageX,
            y: e.pageY
        }, false);
    gameState.stopCycle = window.requestAnimationFrame(run);
    const nextTick = gameState.lastTick + gameState.tickLength;
    let numTicks = 0;
    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick;
        numTicks = Math.floor(timeSinceTick / gameState.tickLength);
    }
    queueUpdates(numTicks);
    draw(tFrame);
    gameState.lastRender = tFrame;
}
function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}
var random = (min, max)=>Math.random() * (max - min) + min;
function rendomWithExcluded(min, max, excludedValue) {
    while(true){
        let rand = random(min, max);
        if (rand != excludedValue) return rand;
    }
}
function onClickEvent(event) {
    // gameState.circles.push(new Circle(e.offsetX, e.offsetY, 10))
    let point = {
        x: event.offsetX,
        y: event.offsetY
    };
    gameState.buttons.forEach((button)=>{
        if (button.rect.contains(point)) button.onClick(button);
    });
}
function spawn() {
    gameState.rects = [];
    gameState.circles = [];
    gameState.polygons = [];
    for(let i = 0; i < shapeCount; i++){
        let size = shapeSize;
        let rect = new (0, _rectangleDefault.default)(random(0, canvas.width), random(0, canvas.height), size, size);
        let circle = new (0, _circleDefault.default)(random(0, canvas.width), random(0, canvas.height), size);
        let triangle = new (0, _polygonDefault.default)(random(0, canvas.width), random(0, canvas.height), 3, size);
        let pentagon = new (0, _polygonDefault.default)(random(0, canvas.width), random(0, canvas.height), 5, size);
        let speed = shapeSpeed;
        rect.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed));
        circle.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed));
        triangle.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed));
        pentagon.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed));
        // gameState.rects.push(rect)
        if (circlesEnable) gameState.circles.push(circle);
        if (trianglesEnable) gameState.polygons.push(triangle);
        if (pentagonEnable) gameState.polygons.push(pentagon);
    }
    gameState.circleDeletionQueue = [];
    gameState.polygonDeletionQueue = [];
}
function setup() {
    canvas.addEventListener("click", onClickEvent, false);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameState.lastTick = performance.now();
    gameState.lastRender = gameState.lastTick;
    gameState.tickLength = 15 //ms
    ;
    gameState.cursor = {
        x: 50,
        y: 50
    };
    spawn();
    gameState.buttons = [];
    gameState.buttons.push({
        rect: new (0, _rectangleDefault.default)(canvas.width - 125, 25, 100, 25),
        text: "Quadtree",
        onClick: (self)=>{
            isQuadTreeCollision = !isQuadTreeCollision;
            collisionFuncPtr = isQuadTreeCollision ? quadTreeCollision : lazyCollision;
            self.text = isQuadTreeCollision ? "Quadtree" : "Lazy";
        }
    });
    gameState.buttons.push({
        rect: new (0, _rectangleDefault.default)(canvas.width - 125, 63, 100, 25),
        text: "Show Tree",
        onClick: (self)=>{
            isDrawTree = !isDrawTree;
            self.text = isDrawTree ? "Hide tree" : "Show tree";
        }
    });
    gameState.buttons.push({
        rect: new (0, _rectangleDefault.default)(canvas.width - 125, 101, 45, 25),
        text: "-",
        onClick: (self)=>{
            shapeCount -= 100;
            if (shapeCount <= 0) shapeCount = 0;
        }
    });
    gameState.buttons.push({
        rect: new (0, _rectangleDefault.default)(canvas.width - 125 + 55, 101, 45, 25),
        text: "+",
        onClick: (self)=>{
            shapeCount += 100;
        }
    });
    gameState.buttons.push({
        rect: new (0, _rectangleDefault.default)(canvas.width - 125, 200, 100, 25),
        text: "Restart",
        onClick: (self)=>{
            spawn();
        }
    });
    gameState.buttons.forEach((button)=>button.rect.color = "gray");
}
setup();
run();

},{"./rectangle":"8admK","./circle":"7fLIW","./quad-tree":"kkB4d","./polygon":"3WMCj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8admK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Rectangle {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = {
            x: 0,
            y: 0
        };
        this.color = "rgb(0, 0, 200)";
    }
    setSpeed(x, y) {
        this.speed.x = x;
        this.speed.y = y;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.w;
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return this.y + this.h;
    }
    contains(point) {
        return point.x >= this.x && point.x < this.x + this.w && point.y >= this.y && point.y < this.y + this.h;
    }
    intersects(rect) {
        return this.x < rect.x + rect.w && rect.x < this.x + this.w && this.y < rect.y + rect.h && rect.y < this.y + this.w;
    }
    containsRect(rect) {
        return rect.left >= this.left && rect.right <= this.right && rect.bottom <= this.bottom && rect.top >= this.top;
    }
}
exports.default = Rectangle;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7fLIW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rectangle = require("./rectangle");
var _rectangleDefault = parcelHelpers.interopDefault(_rectangle);
class Circle {
    constructor(x, y, radius){
        this._x = x;
        this._y = y;
        this.radius = radius;
        this.color = "green";
        this.health = 3;
        this.speed = {
            x: 0,
            y: 0
        };
        this._rect = new (0, _rectangleDefault.default)(x - radius, y - radius, radius * 2, radius * 2);
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._rect.x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._rect.y = value;
    }
    get rect() {
        return this._rect;
    }
    setSpeed(x, y) {
        this.speed = {
            x,
            y
        };
    }
    takeDamage() {
        this.health -= 1;
        if (this.health == 2) this.color = "yellow";
        else if (this.health == 1) this.color = "red";
    }
    contains(point) {
        return Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) < this.radius * this.radius;
    }
    intersects(circle) {
        return Math.sqrt(Math.pow(circle.x - this._x, 2) + Math.pow(circle.y - this._y, 2)) < circle.radius + this.radius;
    }
}
exports.default = Circle;

},{"./rectangle":"8admK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kkB4d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rectangle = require("./rectangle");
var _rectangleDefault = parcelHelpers.interopDefault(_rectangle);
class QuadTree {
    constructor(boundary, capacity = 4){
        if (!boundary) throw TypeError("boundary is null or undefined");
        if (!(boundary instanceof (0, _rectangleDefault.default))) throw TypeError("boundary should be a Rectangle");
        this._shapes = [];
        this._boundary = boundary;
        this._capacity = capacity;
        this._hasChildren = false;
        this._children = [];
        this.maxDepth = 10;
        this.depth;
    }
    // todo
    insert(shape, depth = 0) {
        this.depth = depth;
        if (!this._boundary.containsRect(shape.rect)) return false;
        if (this._hasChildren) {
            if (!this._insertIntoChildren(shape)) this._shapes.push(shape);
            return true;
        } else if (depth >= this.maxDepth || this._shapes.length < this._capacity) {
            this._shapes.push(shape);
            return true;
        } else {
            this._subdivide();
            if (this.insert(shape, depth)) return true;
        }
        return false;
    }
    get length() {
        let count = this._shapes.length;
        if (this._hasChildren) // handle childrens somehow
        this._children.forEach((item)=>{
            count += item.length;
        });
        return count;
    }
    getValues() {
        let result = [];
        this._shapes.forEach((shape)=>{
            result.push(shape);
        });
        this._children.forEach((child)=>{
            let r = child.getValues();
            r.forEach((value)=>result.push(value));
        });
        return result;
    }
    queryRange(rect, found = []) {
        return found;
    }
    findIntersections(predicate) {
        // Find intersections in the current node
        for(let i = 0; i < this._shapes.length; i++){
            let shape1 = this._shapes[i];
            for(let j = 0; j < i; j++){
                let shape2 = this._shapes[j];
                if (shape1.rect.intersects(shape2.rect)) predicate(shape1, shape2);
            }
            this._children.forEach((child)=>{
                child._findIntersictionsInDescendants(this._shapes[i], predicate);
            });
        }
        this._children.forEach((child)=>{
            child.findIntersections(predicate);
        });
    }
    _findIntersictionsInDescendants(shape, predicate) {
        let shape1 = shape;
        for(let i = 0; i < this._shapes.length; i++){
            let shape2 = this._shapes[i];
            if (shape1.rect.intersects(shape2.rect)) predicate(shape1, shape2);
        }
        if (this._hasChildren) this._children.forEach((child)=>{
            child._findIntersictionsInDescendants(shape, predicate);
        });
    }
    // todo call if the number of elements is too big
    _subdivide() {
        const boundary = this._boundary;
        const wHalf = boundary.w / 2;
        const hHalf = boundary.h / 2;
        this._children.push(new QuadTree(new (0, _rectangleDefault.default)(boundary.x, boundary.y, wHalf, hHalf)));
        this._children.push(new QuadTree(new (0, _rectangleDefault.default)(boundary.x + wHalf, boundary.y, wHalf, hHalf)));
        this._children.push(new QuadTree(new (0, _rectangleDefault.default)(boundary.x + wHalf, boundary.y + hHalf, wHalf, hHalf)));
        this._children.push(new QuadTree(new (0, _rectangleDefault.default)(boundary.x, boundary.y + hHalf, wHalf, hHalf)));
        this._hasChildren = true;
        var newValues = [];
        this._shapes.forEach((shape)=>{
            if (!this._insertIntoChildren(shape)) newValues.push(shape);
        });
        this._shapes = newValues;
    }
    _insertIntoChildren(shape) {
        for(let i = 0; i < this._children.length; i++){
            if (this._children[i].insert(shape, this.depth + 1)) return true;
        }
        return false;
    }
    clear() {
        // clear _points and _children arrays
        // see https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        this._shapes = [];
        this._children = [];
        this._hasChildren = false;
    }
}
exports.default = QuadTree;

},{"./rectangle":"8admK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3WMCj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rectangle = require("./rectangle");
var _rectangleDefault = parcelHelpers.interopDefault(_rectangle);
class Polygon {
    constructor(x, y, angleCount, size){
        this._x = x;
        this._y = y;
        this.points = [];
        this.size = size;
        for(let i = 0; i < angleCount; i++){
            let angle = i * (2 * Math.PI / angleCount);
            angle -= Math.PI / 2;
            let point = {
                x: Math.cos(angle) * this.size,
                y: Math.sin(angle) * this.size
            };
            this.points.push(point);
        }
        this.speed = {
            x: 0,
            y: 0
        };
        this.color = "green";
        this.health = 3;
        this._vectors = [] // vectors of sides (http://cyber-code.ru/tochka_v_treugolnike/?ysclid=lfiovplcnc106423362)
        ;
        for(let i = 0; i < this.points.length - 1; i++)this._vectors.push({
            x: this.points[i + 1].x - this.points[i].x,
            y: this.points[i + 1].y - this.points[i].y
        });
        this._vectors.push({
            x: this.points[0].x - this.points[this.points.length - 1].x,
            y: this.points[0].y - this.points[this.points.length - 1].y
        });
        let point = {
            x: -this.points[0].x,
            y: -this.points[0].y
        };
        this._rect = new (0, _rectangleDefault.default)(x - size, y - size, size * 2, size * 2);
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._rect.x = this._x;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._rect.y = value;
    }
    get rect() {
        return this._rect;
    }
    setSpeed(x, y) {
        this.speed.x = x;
        this.speed.y = y;
    }
    takeDamage() {
        this.health -= 1;
        if (this.health == 2) this.color = "yellow";
        else if (this.health == 1) this.color = "red";
    }
    // Algorithm for determining the position of a point relative to a vector
    // https://gamedev.ru/code/forum/?id=49696
    contains(point) {
        let localPoint = {
            x: point.x - this.x,
            y: point.y - this.y
        };
        for(let i = 0; i < this._vectors.length; i++){
            // dot (https://uookn-kursk.ru/wp-content/uploads/5/f/8/5f8ed75a8563d5fb8ccf7b0a607be941.jpeg)
            // i * (y1 * z1 - y2 * x2) - j * (x1 * z1 - x2 * z2) + k * (x1 * y2 - x2 * y1)
            let x1 = this._vectors[i].x;
            let y1 = this._vectors[i].y;
            let x2 = localPoint.x - this.points[i].x;
            let y2 = localPoint.y - this.points[i].y;
            let d = x1 * y2 - x2 * y1;
            if (d <= 0) return false;
        }
        return true;
    }
    containsAnyPoint(polygon) {
        for(let i = 0; i < polygon.points.length; i++){
            let globalPoint = {
                x: polygon.points[i].x + polygon.x,
                y: polygon.points[i].y + polygon.y
            };
            if (this.contains(globalPoint)) return true;
        }
        return false;
    }
    intersects(polygon) {
        // two polygons are intersects when one of them contains a point of the other
        return this.containsAnyPoint(polygon) || polygon.containsAnyPoint(this);
    }
}
exports.default = Polygon;

},{"./rectangle":"8admK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jC2qd","8lqZg"], "8lqZg", "parcelRequirec493")

//# sourceMappingURL=index.975ef6c8.js.map
