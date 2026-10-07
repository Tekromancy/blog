---
title: "The Observer: Mapping Broadcasts"
description: "Saturate the observer pool with state disruptions simultaneously."
type: futhark
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  let notify_observers [n] (event: i32) (observers: [n](i32 -> i32)) : [n]i32 =
    map (\obs -> obs event) observers
tags: [futhark, observer, map]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
