---
date: 2018-08-14 15:00:00
tags: 
  - BTC
  - bitcoin
  - segregated-witness
  - transaction
author: bitbegin
location: wuhan
title: 比特币交易数据解析系列（1）- 隔离见证交易数据结构
---

# 数据的基本结构如下：

## TX

```table
field size |	description |	data type |	comments
4	| version	| int32_t	| Transaction data format version (note, this is signed)
0 or 2	| flag	| optional uint8_t[2]	| If present, always 0001, and indicates the presence of witness data
1+	| tx_in count	| var_int	| Number of Transaction inputs (never zero)
41+	| tx_in	| tx_in[]	| A list of 1 or more transaction inputs or sources for coins
9+	| tx_out | count	| var_int	Number of Transaction outputs
41+	| tx_out	| tx_out[]	| A list of 1 or more transaction outputs or destinations for coins
0+	| tx_witnesses	| tx_witness[]	| A list of witnesses, one for each input; omitted if flag is omitted above
4	| lock_time	| uint32_t	 | 一般为 00000000
```

## input

```table
field size	| description	| data type	| comments
36	| previous_output	| outpoint	| The previous output transaction reference, as an OutPoint structure
1+	| script length	| var_int	| The length of the signature script
?	| signature script	 | uchar[]	| Computational Script for confirming transaction authorization
4	| sequence	| uint32_t	 | 一般为 FFFFFFFF
```

### outpoint

```table
field size	| description	| data type	| comments
32	| hash	| char[32]	 | The hash of the referenced transaction.
4	| index	| uint32_t	 | The index of the specific output in the transaction. The first output is 0, etc.
```

## output

```table
field size	| description	| data type	| comments
8	| value	| int64_t	| Ttransaction value.
1+	| pk_script length	| var_int	| Length of the pk_script
?	| pk_script	| uchar[]	| Usually contains the public key as a Bitcoin script setting up conditions to claim this output.
```

<Vssue :title="$title" />
