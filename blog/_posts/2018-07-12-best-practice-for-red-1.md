---
date: 2018-07-12 14:48:36
tags: 
  - Red
  - Red/System
  - Rebol
author: bitbegin
location: wuhan
title: 使用Red的最佳实践系列（1）- 错误的处理
---

`Red`提供的错误处理机制属于异常。

# Red的异常概念

在`Red`中引入了`error!`类型来表示一个异常，如果直接执行一个`error!`，且没有捕获，会导致程序退出。

## 抛出异常

1. `make error!`
2. `cause-error`
这在下面的`Red异常的用法`章节有介绍
## 捕获异常
可以使用 `try`或者 `attempt`， `try`一个异常时返回的是一个`error!`类型，而`attempt`返回的是`none`。

# Red的异常类型

`Red`的异常有以下几种：

```
>> help system/catalog/errors
SYSTEM/CATALOG/ERRORS is an object! with the following words and values:
     throw     object!       [code type break return throw continue while-cond]
     note      object!       [code type no-load]
     syntax    object!       [code type invalid missing no-header no-rs-header bad-header malconstruct bad-...
     script    object!       [code type no-value need-value not-defined not-in-context no-arg expect-arg ex...
     math      object!       [code type zero-divide overflow positive]
     access    object!       [code type cannot-open invalid-utf8 no-connect]
     user      object!       [code type message]
     internal  object!       [code type bad-path not-here no-memory wrong-mem stack-overflow too-deep featu...

```
比如 `1 / 0`除零异常：

```
>> probe try [1 / 0]
make error! [
    code: 400
    type: 'math
    id: 'zero-divide
    arg1: none
    arg2: none
    arg3: none
    near: none
    where: '/
    stack: 41781600
]
*** Math Error: attempt to divide by zero
*** Where: /
*** Stack: probe  

```
它的`type`为`math`，`id`为`zero-divide`。

再举一个例子：
```
>> probe try [do]
make error! [
    code: 304
    type: 'script
    id: 'no-arg
    arg1: 'do
    arg2: 'value
    arg3: none
    near: none
    where: 'do
    stack: 41781600
]
*** Script Error: do is missing its value argument
*** Where: do
*** Stack: probe  

>> 
```
我们知道系统函数`do`提供了把数据作为代码执行的功能，它需要一个参数，如果程序没有提供参数，就会抛出这样的异常。它的`type`为`script`，`id`为`no-arg`。

而且我们从这些名称可以大致看出错误的原因。

# Red异常的用法

`type`为`user`，`id`为`message`的错误是Red提供的默认用户异常，它可以通过`make error!`创建。

## 通过`make error!`创建异常

```
>> probe try [make error! "hello"]
make error! [
    code: 600
    type: 'user
    id: 'message
    arg1: "hello"
    arg2: none
    arg3: none
    near: none
    where: none
    stack: none
]
*** User Error: "hello"
*** Where: ??? 

```

另外 `make error!`可以创建特定类型的异常：
```
>> probe try [make error! 400]
make error! [
    code: 400
    type: 'math
    id: 'zero-divide
    arg1: none
    arg2: none
    arg3: none
    near: none
    where: none
    stack: none
]
*** Math Error: attempt to divide by zero
*** Where: ??? 

```
或者：
```
>> probe try [make error! [math zero-divide]]
make error! [
    code: 400
    type: 'math
    id: 'zero-divide
    arg1: none
    arg2: none
    arg3: none
    near: none
    where: none
    stack: none
]
*** Math Error: attempt to divide by zero
*** Where: ??? 

```

但是，这两种方式创建的异常都不能带有参数。

## 使用`cause-error`创建异常

```
>> ? cause-error
USAGE:
     CAUSE-ERROR err-type err-id args

DESCRIPTION: 
     Causes an immediate error throw, with the provided information. 
     CAUSE-ERROR is a function! value.

ARGUMENTS:
     err-type     [word!] 
     err-id       [word!] 
     args         [block!] 
```
例如：
```
>> probe try [cause-error 'math 'zero-divide []]
make error! [
    code: 400
    type: 'math
    id: 'zero-divide
    arg1: none
    arg2: none
    arg3: none
    near: none
    where: 'do
    stack: 41459176
]
*** Math Error: attempt to divide by zero
*** Where: do
*** Stack: probe  
```
`cause-error`创建异常的功能更加强大，而且可以带参数。

```
>> probe try [cause-error 'user 'message ["hello" "world"]]
make error! [
    code: 600
    type: 'user
    id: 'message
    arg1: "hello"
    arg2: "world"
    arg3: none
    near: none
    where: 'do
    stack: 41781640
]
*** User Error: "hello"
*** Where: do
*** Stack: probe  

```

# 自定义用户异常

上面例子中的异常都是Red语言提供的异常，有的时候我们需要自定义异常，以区别其他异常。我们可以这样定义一个异常：

```
>> probe system/catalog/errors/user: make system/catalog/errors/user [my-error: ["info [" :arg1 ": (" :arg2 " " :arg3 ")]"]]
make object! [
    code: 800
    type: "User Error"
    message: [:arg1]
    my-error: ["info [" :arg1 ": (" :arg2 " " :arg3 ")]"]
]
== make object! [
    code: 800
    type: "User Error"
    message: [:arg1]
    my-error: ["info [" :ar...
>> 
```
然后可以使用`cause-error`使用该异常类型创建异常：

```
>> new-error: func [name [word!] arg2 arg3][
[    	cause-error 'user 'my-error [name arg2 arg3]
[    ]
== func [name [word!] arg2 arg3][cause-error 'user 'my-error [name arg2 arg3]]
>> probe try [new-error 'func-name "msg1" "msg2"]
make error! [
    code: 601
    type: 'user
    id: 'my-error
    arg1: 'func-name
    arg2: "msg1"
    arg3: "msg2"
    near: none
    where: 'do
    stack: 41781680
]
*** User Error: info [ func-name : ( "msg1"   "msg2" )]
*** Where: do
*** Stack: probe  

```

# Red的`catch/throw`功能

`Red`提供了`catch/throw`语句来完成`block`块的提前返回。

```
write %file.txt "i am a happy little file with no real purpose"
print catch [
    if exists? %file.txt [throw "Doc found"]
    "Doc not found"
]
Doc found
```
`catch/throw`语句是成对出现的，如果程序中使用了`throw`而没有用`catch`捕获，会导致异常：
```
>> probe try [throw "error"]
*** Throw Error: no catch for throw: "error"
*** Where: throw
*** Stack:  
```
# Red异常系统的问题

## make error!还不能带参数(arg1/arg2/arg3)

```
make error! [user message ["msg1" "msg2]]
```
但是可以使用`cause-error`替代

## 不能捕获特定的异常

或许我们可以增加如下语法：
```
probe try/with [cause-error 'user 'message][
    ['user 'message] [probe self]
    ['script 'no-arg] [probe self]]
```
如果两种异常都没有捕获，异常继续向上层`throw`。
当然我们可以捕获后再往上层`throw`，但是这样不方便使用。如果系统提供捕获特定异常的方式，将能够简化部分异常处理。
我们可以利用`bind`，实现该功能：

```
try-catch: func [blk [block!] cond [block!] todo [block!] /local error][
	unless error? error: try blk [return error]
	if do bind cond 'error [return do bind todo 'error]
	error
]

suc: "your todo"

;-- test case 1
command: [1 / 0]
cond: [error/code = 400]
todo: [print ["catch" lf error] suc]
a: try-catch command cond todo
print a = suc

;-- test case 2
command: [1 / 0]
cond: [error/code = 300]
todo: [print ["catch" lf error] 1]
a: try-catch command cond todo
print error? a

;-- test case 3
command: [1 / 1]
cond: [error/code = 300]
todo: [print ["catch" lf error] 1]
a: try-catch command cond todo
print a = 1
```

# Red中异常处理的最佳实践

## 每个context中提供一个自定义异常

```
ctx-a: context [

	system/catalog/errors/user: make system/catalog/errors/user [ctx-a: ["ctx-a [" :arg1 ": (" :arg2 " " :arg3 ")]"]]

	new-error: func [name [word!] arg2 arg3][
		cause-error 'user 'ctx-a [name arg2 arg3]
	]

	func-a: func [][
		new-error 'func-a "msg1" "msg2"
	]
]
```

## 由上层模块捕获异常

<Vssue :title="$title" />
