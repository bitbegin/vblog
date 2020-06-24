---
date: 2018-08-16 21:00:00
tags: 
  - BTC
  - bitcoin
  - segregated-witness
  - transaction
author: bitbegin
location: wuhan
title: 比特币交易数据解析系列（3）- 隔离见证交易hash
---

隔离见证hash算法文档： `https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki`

# 数据组成

## 公钥

未压缩公钥：`04 + X(32B) + Y(32B)`
隔离见证需要的公钥为：`03 + X(32B) `或者 `02 + Y(32B)`

## hash算法

### double sha256 (dSHA256)

* tx id
id = sha256(sha256(data)) = dSHA256(data)
长度为32字节
* address checksum

### hash160

hash160(data) = ripemd160(sha256(data))

## address (pubkey-to-addr)

>> prefix: https://en.bitcoin.it/wiki/List_of_address_prefixes

### legacy address (pubkey-to-legacy-addr)

pubkey-hash = hash160(pubkey)
script-pubkey = prefix + pubkey-hash
encode58-check(data) = encode58(data + dSHA256(data)[0..3])
address = encode58-check(script-pubkey)

### segwit address (pubkey-to-segwit-addr)

pubkey-hash = hash160(pubkey)
redeemScript = 0014 + pubkey-hash
pubkey-to-addr(redeemScript)

# hash计算过程

要解析的交易id： `fc2344f6c98cc19e5b3d7b716f9eaaeb21ab781393731652c710afd07a5505bf`
原始数据内容参考：
`https://tchain.btc.com/fc2344f6c98cc19e5b3d7b716f9eaaeb21ab781393731652c710afd07a5505bf.rawhex`

## 组装 未签名 交易数据

```
nVersion:      01000000
txin:              03 373d0980f9293fc5864c02fa7946ab706a1f0a5c5aedb8ee3a7eaf4d17c65e5e 01000000 00 ffffff00
                          df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df7 00000000 00 ffffff00
                          df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df7 01000000 00 ffffff00
txout:           02 0084d71700000000 17a9145be3eb3165f9c7ad58d3f49dc7f253ac42499eef87
                          ebd4f20300000000 17a91481dd877be5b3b60e3b1ccf547785744345570b9387
nLockTime: 00000000
```
UTXO = 373d0980f9293fc5864c02fa7946ab706a1f0a5c5aedb8ee3a7eaf4d17c65e5e
UTXO-INDEX = 01000000

OUT-VALUE = 0084d71700000000
OUT-SCRIPT = 17a9145be3eb3165f9c7ad58d3f49dc7f253ac42499eef87

## 计算hash

### 计算 input hash

```
hashPrevouts = dSHA256([UTXO + UTXO-INDEX] * n)
    = dSHA256(373d0980f9293fc5864c02fa7946ab706a1f0a5c5aedb8ee3a7eaf4d17c65e5e 01000000 
                     df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df7 00000000
                     df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df7  01000000)
     = 6a59d58aabff920acf810aeca6359dbad8f0e07d9baa1dfdea7880843d44de72
```

### 计算 sequence hash

```
hashSequence = dSHA256([sequence] * n)
    = dSHA256(01000000 00000000 01000000)
    = 89974e58642dbbe1948159e6134c0b1f5b079893ab61cf02417f490cab69e052
```

### 计算 output hash

```
hashOutputs =  dSHA256([OUT-VALUE + OUT-SCRIPT] * n)
    = dSHA256(0084d71700000000 17a9145be3eb3165f9c7ad58d3f49dc7f253ac42499eef87
                         ebd4f20300000000 17a91481dd877be5b3b60e3b1ccf547785744345570b9387)
    = 7162a64cfdd10579b3f3a33e73ae59213588794724897d6cfa18f3ccce398b7c
```

### 计算 hash preimage (for input 1)

>> For P2WPKH witness program, the scriptCode is 0x1976a914{20-byte-pubkey-hash}88ac

```
hash preimage = 
      nVersion:             01000000
      hashPrevouts:     6a59d58aabff920acf810aeca6359dbad8f0e07d9baa1dfdea7880843d44de72
      hashSequence:   89974e58642dbbe1948159e6134c0b1f5b079893ab61cf02417f490cab69e052
      outpoint:             373d0980f9293fc5864c02fa7946ab706a1f0a5c5aedb8ee3a7eaf4d17c65e5e 01000000
      scriptCode:          1976a914 {} 88ac
      amount:               {input amount}
      nSequence:         ffffff00
      hashOutputs:      7162a64cfdd10579b3f3a33e73ae59213588794724897d6cfa18f3ccce398b7c
      nLockTime:         00000000
      nHashType:         01000000
```
sigHash = dSHA256(hash preimage)


