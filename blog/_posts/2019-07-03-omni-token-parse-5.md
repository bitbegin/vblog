---
date: 2019-07-05 10:15:00
key: 'BTC, bitcoin, omni, mastercoin, transaction'
tags: 
  - BTC
  - bitcoin
  - omni
  - mastercoin
  - transaction
author: bitbegin
location: wuhan
title: 比特币交易数据解析系列（5）- OMNI协议分析
---

## 安装core

### 配置bitcoin.conf

```
txindex=1
rpcport=54352
rpcuser=xxx
rpcpassword=xxx
testnet=1
addnode=104.237.131.138
addnode=151.80.205.132
addnode=192.155.82.123
addnode=74.220.255.190
addnode=80.100.203.151
#dbcache=4096
#listen=0
banscore=10
#par=-1

```

### 打开server

`omnicored -conf=d:/omni/bitcoin.conf -datadir=d:/omni -testnet`

## 测试环境

### 创建测试地址

```
PS C:\Users\bitbegin> omnicore-cli -testnet "getnewaddress" mytest
n4d8tkDrhF7PcDTPSuUckT927GHonewV7T
PS C:\Users\bitbegin> omnicore-cli "getaddressesbyaccount" "mytest"
[
  "n4d8tkDrhF7PcDTPSuUckT927GHonewV7T"
]
```

### 给该地址发送测试coin

查看交易tx：
```
omnicore-cli -testnet "gettransaction" "649186a7571c326315ab236eddcacb99c33764248abf0367b4c5416d3df2da52"
```
查看余额：
```
omnicore-cli -testnet getbalance "mytest"
```

### 获取omni测试coin

```
omnicore-cli -testnet sendtoaddress "moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP" 0.1
```

### 查询omni测试coin

```
omnicore-cli -testnet "omni_getbalance" "n4d8tkDrhF7PcDTPSuUckT927GHonewV7T" 2
```

## 发送omni

raw方式send

### 生成rawtx

利用
```
http://builder.bitwatch.co/?version=0&type=0&currency_identifier=1&number_of_coins=100000000&sender=mvayzbj425X55kRLLPQiuCXWUED6LMP65C&reference=n4EmA9R4VmxLnxu9G8yZMDxvBBha8bUtEQ
```
生成
```
omnicore-cli omni_sendrawtx "n4d8tkDrhF7PcDTPSuUckT927GHonewV7T" "00000000000000020000000000000001" "n495sTgesEv2qBgvDSmX3Gw3ZTo46o6WYS"
```
执行后得到：
```
1058a88559322fcf407b6b637ced13d2614a433007494d92c61d497bfc7e12b1
```
查看tx信息：
```
PS C:\Users\bitbegin> omnicore-cli -testnet "omni_gettransaction" "1058a88559322fcf407b6b637ced13d2614a433007494d92c61d497bfc7e12b1"
{
  "txid": "1058a88559322fcf407b6b637ced13d2614a433007494d92c61d497bfc7e12b1",
  "fee": "0.00000256",
  "sendingaddress": "n4d8tkDrhF7PcDTPSuUckT927GHonewV7T",
  "referenceaddress": "n495sTgesEv2qBgvDSmX3Gw3ZTo46o6WYS",
  "ismine": true,
  "version": 0,
  "type_int": 0,
  "type": "Simple Send",
  "propertyid": 2,
  "divisible": true,
  "amount": "0.00000001",
  "valid": true,
  "blockhash": "0000000000000266d4fe956c655e82c1ae0746e9a3f7c5030f0f03868ab35767",
  "blocktime": 1562291469,
  "positioninblock": 128,
  "block": 1567520,
  "confirmations": 2
}
```

### 利用 omni_send

```
omnicore-cli "omni_send" "n4d8tkDrhF7PcDTPSuUckT927GHonewV7T" "mtdQb3vMzKm1cBefyNSF8dsGNu4r6gig9Z" 2 "1"
```
执行后得到：
```
ccc066f9c85e93ad90ad5c9545d68fdfc47cb2544b07f93363ff494c8abbec81
```

## omni输出脚本

### 数据结构

```table
字节数 | 数据 | 描述 
4 | 6f6d6e69 | omni 
2 | 0000 | 版本： 0 
2 | 0000 | 0 => 交易类型：Simple Send 
4 | 0000001f | 31 => 货币：USDT 
8 | 000000018a3052b0 | 66.1339 => 转账金额 
```

### 数据解析

原始数据
```
6a146f6d6e6900000000000000020000000000000001
```
解析：
```
6a          ; OP_RETURN 
14          ; length
6f6d6e69    ; string "omni"
0000        ; version
0000        ; Simple Send 
00000002  ; omni test
0000000000000001  ; value
```

<Vssue :title="$title" />
