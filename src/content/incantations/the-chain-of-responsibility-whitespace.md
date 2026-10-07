---
title: Chain of Responsibility in Whitespace
description: Passing the silent burden along a linked path of nodes.
type: whitespace
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Linkage"
formula: |2
     	
     	
   	
   	 
  
tags: [unseen-sigils, behavioral, chain-of-responsibility, whitespace]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Linked Path of the Silent Burden

The Chain of Responsibility decouples the sender of a request from its receiver by passing the request along a chain of handlers. In Whitespace, this manifests as a series of linked heap structures or sequential label evaluations.

The request, encoded as a value on the stack, is checked against the first handler's criteria. If it cannot handle it, it retrieves the address of the next handler from the heap and jumps to it.

This unseen relay race continues until a handler consumes the stack value and executes the desired operation. The sigils remain completely unreadable, yet the logic flows seamlessly through the void.
