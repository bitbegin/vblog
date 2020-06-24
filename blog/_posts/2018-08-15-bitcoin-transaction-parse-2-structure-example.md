---
date: 2018-08-15 18:00:00
tags: 
  - BTC
  - bitcoin
  - segregated-witness
  - transaction
author: bitbegin
location: wuhan
title: 比特币交易数据解析系列（2）- 隔离见证交易数据结构解析实例
---

要解析的交易id： `fc2344f6c98cc19e5b3d7b716f9eaaeb21ab781393731652c710afd07a5505bf`
原始数据内容参考：
`https://tchain.btc.com/fc2344f6c98cc19e5b3d7b716f9eaaeb21ab781393731652c710afd07a5505bf.rawhex`
原始数据内容:
```
01000000000103373d0980f9293fc5864c02fa7946ab706a1f0a5c5aedb8ee3a7eaf4d17c65e5e010000001716001483257fc24165625e80b722a468b387ad8008976dffffff00df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df7000000001716001461fd4f0351b7c446128c320764d59d94f9274d8bffffff00df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df70100000017160014401fc654bf702e0bb991d8957e3b1ea3374a4f09ffffff00020084d7170000000017a9145be3eb3165f9c7ad58d3f49dc7f253ac42499eef87ebd4f2030000000017a91481dd877be5b3b60e3b1ccf547785744345570b938702483045022100b8d1e7a9453f09a0aff9288533bb6c32fcb83edee4545853dd44f9af1d4acc20022013d7a5f84ec7db69b416f7f8a863b0c98a8ad03496275bee057da26008c50ccf012103c77bad126773776975e6ee131bea89f77e212c44537cb9cc4115b201fe4e2e1302483045022100d41a793fdb4852db93a0b7f2002c0e17fbb5fd7bac8d31b00b320681c08c2c2e022000a0eb06c9f649dafb1c6ee6214aa2ac2f7422f8567947c73d8245058c9dacb8012102e2ed7b46d33f5cf691ae52dccb8dd3e06f03c0b16b4f72728df90acefcbf0cba02473044022018e2b4924e2545feb79217d48ed89fa91f60d9f11f5570332244ff9918e6cebe022078d3aa0534f448a5ed6e547f44fbd3c67305c4e01ab460225509dcdea094648c012102426b7cdb586c1d0d0909967b2d06fe4ee8289e61c7ab9ca360d5fcddd9641a3600000000
```

# 整体解析过程

```

01000000																;version
0001																	;witness flag

03																		;tx_in count
373d0980f9293fc5864c02fa7946ab706a1f0a5c5aedb8ee3a7eaf4d17c65e5e		;unspend txid
01000000																;unspend txid's output index
17																		;scriptSig length
16																		;PUSHDATA
001483257fc24165625e80b722a468b387ad8008976d							;P2SH(pubkey-hash)
ffffff00																;sequence
df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df7		;unspend txid
00000000																;unspend txid's output index
17																		;scriptSig length
16																		;PUSHDATA
001461fd4f0351b7c446128c320764d59d94f9274d8b							;P2SH(pubkey-hash)
ffffff00																;sequence
df618d78879c213bde156e3ee55d1abe1badf750828aa0587d4a6d7fd2a41df7		;unspend txid
01000000																;unspend txid's output index
17																		;scriptSig length
16																		;PUSHDATA
0014401fc654bf702e0bb991d8957e3b1ea3374a4f09							;P2SH(pubkey-hash)
ffffff00																;sequence

02																		;tx_out count
0084d71700000000														;tx_out 1: value
17																		;pk_script length
a9145be3eb3165f9c7ad58d3f49dc7f253ac42499eef87							;pk_script
ebd4f20300000000														;tx_out 2: value
17																		;pk_script length
a91481dd877be5b3b60e3b1ccf547785744345570b9387							;pk_script


02																		;tx_in 1: item count
48																		;item 1: length
3045022100b8d1e7a9453f09a0aff9288533bb6c32fcb83edee4545853dd44f9af1d4acc20022013d7a5f84ec7db69b416f7f8a863b0c98a8ad03496275bee057da26008c50ccf01	;item 1: content
21																		;item 2: length
03c77bad126773776975e6ee131bea89f77e212c44537cb9cc4115b201fe4e2e13		;item 2: content
02																		;tx_in 2: item count
48																		;item 1: length
3045022100d41a793fdb4852db93a0b7f2002c0e17fbb5fd7bac8d31b00b320681c08c2c2e022000a0eb06c9f649dafb1c6ee6214aa2ac2f7422f8567947c73d8245058c9dacb801	;item 1: content
21																		;item 2: length
02e2ed7b46d33f5cf691ae52dccb8dd3e06f03c0b16b4f72728df90acefcbf0cba		;item 2: content
02																		;tx_in 3: item count
47																		;item 1: length
3044022018e2b4924e2545feb79217d48ed89fa91f60d9f11f5570332244ff9918e6cebe022078d3aa0534f448a5ed6e547f44fbd3c67305c4e01ab460225509dcdea094648c01		;item 1: content
21																		;item 2: length
02426b7cdb586c1d0d0909967b2d06fe4ee8289e61c7ab9ca360d5fcddd9641a36		;item 2: content
00000000																;locktime
```

# 输入脚本解析：

```
17																		            ;scriptSig length
16																		            ;PUSHDATA
0014                                                                                 ;P2SH header
83257fc24165625e80b722a468b387ad8008976d		;pubkey-hash
```

# witness 签名脚本

## 签名数据

```
48 3045022100b8d1e7a9453f09a0aff9288533bb6c32fcb83edee4545853dd44f9af1d4acc20022013d7a5f84ec7db69b416f7f8a863b0c98a8ad03496275bee057da26008c50ccf01
```
解析：

```
48								;length
30								;DER start
45								;DER length
>>> DER start
02								;?
21								;R length
00b8d1e7a9453f09a0aff9288533bb6c32fcb83edee4545853dd44f9af1d4acc20		;R
02								;?
20								;S length
13d7a5f84ec7db69b416f7f8a863b0c98a8ad03496275bee057da26008c50ccf		;S
>>> DER end
01
```

## 签名 公钥脚本：

```
21								;pubkey length
03c77bad126773776975e6ee131bea89f77e212c44537cb9cc4115b201fe4e2e13		;pubkey
```

# 输入脚本pubkey-hash 与见证数据公钥 关系

```
pubkey-hash = hash160(pubkey)
```


