---
title: "The Chain of Responsibility Link"
description: "Passing a request along a chain of handlers until one handles it."
type: agda
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Routing"
formula: |2
  module ChainOfResponsibility where
  
  open import Data.String
  open import Data.Maybe
  
  Handler : Set
  Handler = String → Maybe String
  
  chain : Handler → Handler → Handler
  chain h1 h2 req with h1 req
  ... | just res = just res
  ... | nothing  = h2 req
tags: ["agda", "chain", "behavioral"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Chain of Responsibility Link

Incoming network attacks are complex. Instead of a single monolith sorting them out, we chain specialized daemons. If the firewall can't block it, it passes to the virus-scanner, then to the core logic.

## The Dependent Runes

Handlers are functions returning `Maybe String`. By combining them with a monadic or simple matching `chain` function, the flow of control securely cascades down the nodes.
