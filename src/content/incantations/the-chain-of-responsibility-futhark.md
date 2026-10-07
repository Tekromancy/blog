---
title: "The Chain of Responsibility: Funneling Data"
description: "Cascade data through sequence matches until it is consumed."
type: futhark
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  type handling = #handled i32 | #pass i32
  
  let handle_a (x: i32) = if x < 10 then #handled x else #pass x
  let handle_b (x: i32) = if x < 100 then #handled (x*2) else #pass x
  
  let chain (x: i32) : i32 =
    match handle_a x
    case #handled res -> res
    case #pass p1 -> 
      match handle_b p1
      case #handled res -> res
      case #pass p2 -> p2 * -1
tags: [futhark, chain-of-responsibility, matching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
