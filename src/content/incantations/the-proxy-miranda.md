---
title: The Proxy of the Ancestral Monad
description: Providing a pure surrogate to control access to a deeper aspect of the Ancestral Monad.
type: miranda
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Ancestral Monad"
formula: |2
  || Proxy delays evaluation via Miranda's inherent laziness.
  
  real_subject :: num -> string
  real_subject x = "Expensive computation of " ++ show (x ^ 10)
  
  proxy :: num -> string
  proxy x = if x < 0
            then "Access Denied by Ancestral Monad"
            else real_subject x
tags: [miranda, structural, proxy, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
