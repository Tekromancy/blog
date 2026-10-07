---
title: "The State: Dimensional Transitions"
description: "Iterate across varied dimensional states dynamically via pattern matching."
type: futhark
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  type state = #idle | #charging i32 | #overload
  
  let transition (s: state) (event: i32) : state =
    match s
    case #idle -> if event > 0 then #charging event else #idle
    case #charging v -> if v + event > 100 then #overload else #charging (v + event)
    case #overload -> #idle
tags: [futhark, state, matching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
