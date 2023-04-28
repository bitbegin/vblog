(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{388:function(e,t,v){"use strict";v.r(t);var _=v(5),a=Object(_.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"red-0-5-1-新的命令行终端和错误支持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#red-0-5-1-新的命令行终端和错误支持"}},[e._v("#")]),e._v(" Red 0.5.1 --新的命令行终端和错误支持")]),e._v(" "),t("p",[e._v("经过漫长的等待，"),t("code",[e._v("Red")]),e._v("终于完成了"),t("code",[e._v("0.5.1")]),e._v("的发布。新版的"),t("code",[e._v("Red")]),e._v("主要带来了新的命令行终端和错误支持，以及bug修复和其他改进。")]),e._v(" "),t("p",[t("img",{attrs:{src:"/2015-03-18-red-051-released/respect.jpg",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"新的命令行终端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#新的命令行终端"}},[e._v("#")]),e._v(" 新的命令行终端")]),e._v(" "),t("ul",[t("li",[e._v("提升"),t("code",[e._v("Unix")]),e._v("平台兼容性")]),e._v(" "),t("li",[e._v("更好的命令补全特性")]),e._v(" "),t("li",[e._v("更好的跨平台特性")]),e._v(" "),t("li",[e._v("内建命令历史")]),e._v(" "),t("li",[e._v("可定制"),t("code",[e._v("prompt")])]),e._v(" "),t("li",[e._v("支持"),t("code",[e._v("ESC")]),e._v("中断")]),e._v(" "),t("li",[e._v("...")])]),e._v(" "),t("h3",{attrs:{id:"错误支持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#错误支持"}},[e._v("#")]),e._v(" 错误支持")]),e._v(" "),t("p",[t("code",[e._v("Red")]),e._v("现在把"),t("code",[e._v("errors")]),e._v("当做一等公民来处理，专门定义了"),t("code",[e._v("error!")]),e._v("数据类型。\n官方的例子：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('a: 0 if error? err: try [1 / a][print "divide by zero"]\n')])])]),t("h3",{attrs:{id:"排序函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#排序函数"}},[e._v("#")]),e._v(" 排序函数")]),e._v(" "),t("p",[e._v("学过"),t("code",[e._v("C")]),e._v("的都知道，在考试中经常会出现各种排序算法，经常会把他们搞混淆。\n"),t("code",[e._v("Red")]),e._v("目前实现了同"),t("code",[e._v("Rebol")]),e._v("相同的"),t("code",[e._v("sort")]),e._v("函数。")]),e._v(" "),t("p",[e._v("例子1：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("scores: [2 3 1 9 4 8]\nsort scores\n== [1 2 3 4 8 9]\n")])])]),t("p",[e._v("例子2：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('str: "CgBbefacdA"\nsort copy str\n== "aABbCcdefg"\nsort/case copy str\n== "ABCabcdefg"\nstr\n== "CgBbefacdA"\n')])])]),t("p",[e._v("太复杂的例子我也看不懂了，就不列了。")]),e._v(" "),t("h3",{attrs:{id:"新的数据类型和运行时类型检测支持"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#新的数据类型和运行时类型检测支持"}},[e._v("#")]),e._v(" 新的数据类型和运行时类型检测支持")]),e._v(" "),t("p",[t("code",[e._v("Red")]),e._v("新增了几种数据类型，完整实现了"),t("code",[e._v("typeset!")]),e._v("数据类型。")]),e._v(" "),t("h3",{attrs:{id:"red-system的改进"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#red-system的改进"}},[e._v("#")]),e._v(" "),t("code",[e._v("Red/System")]),e._v("的改进")]),e._v(" "),t("p",[e._v("通过使用"),t("code",[e._v("catch")]),e._v("语句允许捕获过滤后的异常。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('Red/System []\n\ncatch 100 [\n    print "hello"\n    throw 10\n    print "<hidden>"\n]\nprint " world"\n')])])]),t("p",[e._v("将输出：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("hello world\n")])])]),t("p",[e._v("另外"),t("code",[e._v("Red/System")]),e._v("新增了两个预处理指令："),t("code",[e._v("#get <path>")]),e._v("和"),t("code",[e._v("#in <path> <word>")]),e._v("。")]),e._v(" "),t("h2",{attrs:{id:"red-0-5-2预告"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#red-0-5-2预告"}},[e._v("#")]),e._v(" Red 0.5.2预告")]),e._v(" "),t("p",[t("code",[e._v("0.5.2")]),e._v("将改进程序运行速度和代码大小，而且这个版本不会花费太长的时间。")]),e._v(" "),t("Vssue",{attrs:{title:e.$title}})],1)}),[],!1,null,null,null);t.default=a.exports}}]);