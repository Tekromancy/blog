---
title: The Chain of Responsibility
description: Monadic failure and the Maybe monad to pass the burden along the chain.
type: haskell
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Divination // Flow
formula: |
  module ChainOfResponsibility where
  import Control.Applicative ((<|>))
  handler1 x = if x == 1 then Just "H1 handled" else Nothing
  handler2 x = if x == 2 then Just "H2 handled" else Nothing
  chain x = handler1 x <|> handler2 x
tags: [chain, maybe-monad, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
