---
date: 2016-02-24 22:23
tags: 
  - Red
  - Red/System
  - Rebol
author: bitbegin
location: wuhan
title: Red的bind操作
---

## Red的bind函数

![](@assets/2016-02-24-bind-in-red/bind.gif)


`Red`中的`bind`函数是个比较有意思的东西，刚接触时一直没有看懂这是个什么玩意，不信你看：

```
code: [a + b]
add: function [a b] [
    b: 12
    do bind code 'a
]
print add 34 10
```

输出结果`46`。

起初看这段代码是一头雾水的，但是经过研究发现是这么回事：

`bind`的第一个参数为`block`，里面的符号可以重新绑定，第二个参数为绑定的上下文，分为两种情况。

* 符号`'symbol`：使用该符号`symbol`的上下文，告诉第一个参数`block`去哪个上下文绑定
* `context`: 使用`context`定义的上下文 

我们再来看上面的例子：
`add 34 10` 后局部变量 状态`a = 34` `b = 10`，继续执行`b: 12`，局部变量状态变为`a = 34` `b = 12`，`bind code 'a`后，code中的`a`和`b`绑定到局部变量，而do会对block求值，所以返回`46`

### 第二个参数为符号`'symbol`的例子

一个递归调用的例子

```
Red []
foreach-leaf: func [word [word!] spec [block!] body [block!]][
    "Depth-first tree of blocks traversal iterator"
    bind body 'spec
    while [not tail? spec][
        either block? spec/1 [
            foreach-leaf word spec/1 body
        ][
            set word spec/1
            do body
        ]
        spec: next spec
    ]
]

total: 0
foreach-leaf 'i [1 2 [3 [4 5] 6] 7 [8]] [total: total + i]
?? total
```

### 第二个参数为`context`的例子

```
ctx: context [a: 1 b: 2]
do bind [a + b] ctx
```

有关`bind`用法的更为详细的解释看 [这里](http://www.pat665.free.fr/doc/bind.html)