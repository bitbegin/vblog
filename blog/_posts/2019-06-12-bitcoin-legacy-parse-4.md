---
date: 2019-06-12 16:43:00
tags: 
  - BTC
  - bitcoin
  - legacy
  - transaction
author: bitbegin
location: wuhan
title: 比特币交易数据解析系列（4）- (旧)交易数据结构解析实例
---

要解析的交易id： `10458e2d3be3f5545e91cefa9b8df82e0e220c936a01051e10b16d4abeacb3c6`
原始数据内容参考：
`https://tbtc.bitaps.com/raw/transaction/10458e2d3be3f5545e91cefa9b8df82e0e220c936a01051e10b16d4abeacb3c6`
原始数据内容:

```
01000000063dca18206219680bf54578ae2299bcc832f0c95c86322fbdd5fdbb1d4a0acff7000000006b483045022100bb88df92ca6b737beb498c4490b277f109616a65fc2f792df6c66bd6d558480602207232be9d8e1844a21e076f02c300dcaa8d65cf0ce68817761682539fccb9e139012103a2b62a426a6e71a56684ec80c884c6ddb10a09fd431b4a57b635f71817990e32ffffffffad6e17b4c9916d63f87292ff11c7c24b77857bcc309c53e3394b770cc0609de7000000006b483045022100c3bbc3607c427ce0fb28be0fe5dc31241125ad64abd71180fa4fc23e65d4ff14022070a600d44651f360155b0ab678688eafb2a89f54e0ab931fc8f2ad72f69e163601210300278a696ba6efbf7884e4adabd7c5f6161724387ce8999eecb69975f65e1a35ffffffff99406b9daff930f57ed4444b8f79ea2a3529807bf89ce217678b499eda19e4e6000000006b483045022100f05d42ab0a0cfa85f10289d69a2e30c76c04462f43798ca7c97956558ff0032002202f8ca26c1b0d672b62cf4bb01b438196abc9a921ba605640b9087c419de07be30121031730a4d5701d941ca28f5d153cc04c1bd0533101ec9fdecdc5147096f7e4f44cffffffff30abcaa5834bdc00bb13047cf15e8f6f37f771fd4d4022dd4584380ffe6e138c000000006b483045022100ea6c681baac6187c557c1308371b00bb43e9cdfb49525ac3c293fd9b0e616fef0220514da5a9d5a55311f335fac5ec57c1c6d5071988b623a6e6912f07a11f2ef6740121033b5276e6a966e5ed9c206de5c213c68a049e364f7c5fddfbf4c561965e2ac541ffffffff5ebb81294c97ae271b8e96af7b8d374627ebe3d04285e90971db9bafb2b6a98c000000006b4830450221008e17c4bb1582c962f7f2b2df558fdeda5d03f9719ff989cd4a61bbeb71487d27022037aa7e80107858fd9f997d6b785814214e2750542fbac1f207ee49bf084239f701210285bc8e87f2e9ebaf7476d2194f300b83768e4ce25c8f145fe010ba81938a7ecbffffffffbea09d9c749de715c01d825e01330064065a0e2b2108c41038003004b082431a000000006b483045022100e92f8b716215771c4780fa397bbde393e92f9827175045df531ead64df0f0e3c02207b536cb2e292b211641c9f4acaf99a85e6489f108abca6e9e65d335036890c790121036125f085f7ee10631c8c9b676e78c6210499c2a2f1768c20f22b064c5b41fc4dffffffff011bdcc007000000001976a91433e43b89f45ff9b53726fbf4d41f8e0688410af088ac00000000
```

# 整体解析过程

```
01000000                      ;version
06                                  ;input count
;-- input 1
3dca18206219680bf54578ae2299bcc832f0c95c86322fbdd5fdbb1d4a0acff7    ;prev_hash (32B)
00000000                    ;prev index
6b                                  ;script length(107)
483045022100bb88df92ca6b737beb498c4490b277f109616a65fc2f792df6c66bd6d558480602207232be9d8e1844a21e076f02c300dcaa8d65cf0ce68817761682539fccb9e139012103a2b62a426a6e71a56684ec80c884c6ddb10a09fd431b4a57b635f71817990e32          ;scriptSig

ffffffff                            ;sequence
;-- input 2
ad6e17b4c9916d63f87292ff11c7c24b77857bcc309c53e3394b770cc0609de7     ;prev_hash (32B)
00000000                      ;prev index
6b                                  ;script length(107)
483045022100c3bbc3607c427ce0fb28be0fe5dc31241125ad64abd71180fa4fc23e65d4ff14022070a600d44651f360155b0ab678688eafb2a89f54e0ab931fc8f2ad72f69e163601210300278a696ba6efbf7884e4adabd7c5f6161724387ce8999eecb69975f65e1a35               ;scriptSig
ffffffff                            ;sequence
;-- input 3
99406b9daff930f57ed4444b8f79ea2a3529807bf89ce217678b499eda19e4e6
00000000
6b
483045022100f05d42ab0a0cfa85f10289d69a2e30c76c04462f43798ca7c97956558ff0032002202f8ca26c1b0d672b62cf4bb01b438196abc9a921ba605640b9087c419de07be30121031730a4d5701d941ca28f5d153cc04c1bd0533101ec9fdecdc5147096f7e4f44c
ffffffff
;-- input 4
30abcaa5834bdc00bb13047cf15e8f6f37f771fd4d4022dd4584380ffe6e138c
00000000
6b
483045022100ea6c681baac6187c557c1308371b00bb43e9cdfb49525ac3c293fd9b0e616fef0220514da5a9d5a55311f335fac5ec57c1c6d5071988b623a6e6912f07a11f2ef6740121033b5276e6a966e5ed9c206de5c213c68a049e364f7c5fddfbf4c561965e2ac541
ffffffff
;-- input 5
5ebb81294c97ae271b8e96af7b8d374627ebe3d04285e90971db9bafb2b6a98c
00000000
6b
4830450221008e17c4bb1582c962f7f2b2df558fdeda5d03f9719ff989cd4a61bbeb71487d27022037aa7e80107858fd9f997d6b785814214e2750542fbac1f207ee49bf084239f701210285bc8e87f2e9ebaf7476d2194f300b83768e4ce25c8f145fe010ba81938a7ecb
ffffffff
;-- input 6
bea09d9c749de715c01d825e01330064065a0e2b2108c41038003004b082431a
00000000
6b
483045022100e92f8b716215771c4780fa397bbde393e92f9827175045df531ead64df0f0e3c02207b536cb2e292b211641c9f4acaf99a85e6489f108abca6e9e65d335036890c790121036125f085f7ee10631c8c9b676e78c6210499c2a2f1768c20f22b064c5b41fc4d
ffffffff

;-- output
01      ; output count
1bdcc00700000000
19      ; length
76a91433e43b89f45ff9b53726fbf4d41f8e0688410af088ac
00000000
```

# 输入脚本解析：

参考 **witness 签名脚本**

```
48      ；DER length
30      ; DER start
45      ; DER len
02
21      ; len
00bb88df92ca6b737beb498c4490b277f109616a65fc2f792df6c66bd6d5584806  ;R
02      ; len
20      ; len
7232be9d8e1844a21e076f02c300dcaa8d65cf0ce68817761682539fccb9e139  ;S
01      ; 

```

## 签名 公钥脚本：

```
21								;pubkey length
03a2b62a426a6e71a56684ec80c884c6ddb10a09fd431b4a57b635f71817990e32		;pubkey
```

<Vssue :title="$title" />