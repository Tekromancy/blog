---
title: "The Proxy Pattern in Michelson"
description: "A secure gateway controlling access and delegation to an underlying high-value contract."
type: michelson
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Stackmancy"
formula: |2
  parameter (unit %proxy_call);
  storage address;
  code {
    DROP;
    # Realistically, this would build an operation to transfer tokens or call the stored address
    # For Proxy, we verify access control first
    SENDER;
    SOURCE;
    COMPARE; EQ;
    IF {} { PUSH string "ProxyError: Direct access required"; FAILWITH; };
    NIL operation; PAIR
  }
tags: [structural, proxy, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
