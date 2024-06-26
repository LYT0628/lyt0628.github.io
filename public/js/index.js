"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ns-hugo:/home/lyt0628/lyt0628.github.io/themes/mona/assets/js/lib/addLoadEvent.js
  var require_addLoadEvent = __commonJS({
    "ns-hugo:/home/lyt0628/lyt0628.github.io/themes/mona/assets/js/lib/addLoadEvent.js"(exports) {
      "use strict";
      function addLoadEvent2(func) {
        var oldonload = window.onload;
        if (typeof window.onload !== "function") {
          window.onload = func;
        } else {
          window.onload = function() {
            oldonload();
            func();
          };
        }
      }
      exports.addLoadEvent = addLoadEvent2;
    }
  });

  // ns-hugo:/home/lyt0628/lyt0628.github.io/themes/mona/assets/js/lib/nodeName.js
  var require_nodeName = __commonJS({
    "ns-hugo:/home/lyt0628/lyt0628.github.io/themes/mona/assets/js/lib/nodeName.js"(exports) {
      "use strict";
      function nodeName2(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      }
      exports.nodeName = nodeName2;
    }
  });

  // ns-hugo:/home/lyt0628/lyt0628.github.io/themes/mona/assets/js/lib/index.js
  var import_addLoadEvent = __toESM(require_addLoadEvent());
  var import_nodeName = __toESM(require_nodeName());

  // <stdin>
  console.log("This site was generated by Hugo.");
  function printHello() {
    console.log("Hello");
  }
  import_addLoadEvent.addLoadEvent(printHello);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzovaG9tZS9seXQwNjI4L2x5dDA2MjguZ2l0aHViLmlvL3RoZW1lcy9tb25hL2Fzc2V0cy9qcy9saWIvYWRkTG9hZEV2ZW50LmpzIiwgIm5zLWh1Z286L2hvbWUvbHl0MDYyOC9seXQwNjI4LmdpdGh1Yi5pby90aGVtZXMvbW9uYS9hc3NldHMvanMvbGliL25vZGVOYW1lLmpzIiwgIm5zLWh1Z286L2hvbWUvbHl0MDYyOC9seXQwNjI4LmdpdGh1Yi5pby90aGVtZXMvbW9uYS9hc3NldHMvanMvbGliL2luZGV4LmpzIiwgIjxzdGRpbj4iXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBhZGRMb2FkRXZlbnQoZnVuYykge1xuICAgIHZhciBvbGRvbmxvYWQgPSB3aW5kb3cub25sb2FkO1xuICAgIGlmICh0eXBlb2Ygd2luZG93Lm9ubG9hZCAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdHdpbmRvdy5vbmxvYWQgPSBmdW5jO1xuICAgIH0gZWxzZSB7XG5cdHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0ICAgIG9sZG9ubG9hZCgpO1xuXHQgICAgZnVuYygpO1xuXHR9XG4gICAgfVxufVxuXG5cbmV4cG9ydHMuYWRkTG9hZEV2ZW50ID0gYWRkTG9hZEV2ZW50O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIG5vZGVOYW1lKGVsZW0sIG5hbWUpe1xuICAgIHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufVxuXG5cbmV4cG9ydHMubm9kZU5hbWUgPSBub2RlTmFtZTtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuXG5cbmV4cG9ydCB7YWRkTG9hZEV2ZW50fSBmcm9tIFwiLi9hZGRMb2FkRXZlbnQuanNcIjtcblxuZXhwb3J0IHtub2RlTmFtZX0gZnJvbSAnLi9ub2RlTmFtZS5qcyc7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cblxuY29uc29sZS5sb2coJ1RoaXMgc2l0ZSB3YXMgZ2VuZXJhdGVkIGJ5IEh1Z28uJyk7XG5cblxuaW1wb3J0ICogYXMgdGFqcyBmcm9tICcuL2xpYi9pbmRleC5qcyc7XG5cblxuZnVuY3Rpb24gcHJpbnRIZWxsbygpIHtcbiAgICBjb25zb2xlLmxvZygnSGVsbG8nKTtcbn1cblxuXG5cbnRhanMuYWRkTG9hZEV2ZW50KHByaW50SGVsbG8pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxlQUFTQSxjQUFhLE1BQU07QUFDeEIsWUFBSSxZQUFZLE9BQU87QUFDdkIsWUFBSSxPQUFPLE9BQU8sV0FBVyxZQUFZO0FBQzVDLGlCQUFPLFNBQVM7QUFBQSxRQUNiLE9BQU87QUFDVixpQkFBTyxTQUFTLFdBQVc7QUFDdkIsc0JBQVU7QUFDVixpQkFBSztBQUFBLFVBQ1Q7QUFBQSxRQUNHO0FBQUEsTUFDSjtBQUdBLGNBQVEsZUFBZUE7QUFBQTtBQUFBOzs7QUNmdkI7QUFBQTtBQUFBO0FBR0EsZUFBU0MsVUFBUyxNQUFNLE1BQUs7QUFDekIsZUFBTyxLQUFLLFlBQVksS0FBSyxTQUFTLFlBQVksTUFBTSxLQUFLLFlBQVk7QUFBQSxNQUM3RTtBQUdBLGNBQVEsV0FBV0E7QUFBQTtBQUFBOzs7QUNKbkIsNEJBQTJCO0FBRTNCLHdCQUF1Qjs7O0FDSHZCLFVBQVEsSUFBSSxrQ0FBa0M7QUFNOUMsV0FBUyxhQUFhO0FBQ2xCLFlBQVEsSUFBSSxPQUFPO0FBQUEsRUFDdkI7QUFJQSxFQUFLLGlDQUFhLFVBQVU7IiwKICAibmFtZXMiOiBbImFkZExvYWRFdmVudCIsICJub2RlTmFtZSJdCn0K
