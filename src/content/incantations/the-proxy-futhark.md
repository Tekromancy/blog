---
title: "The Proxy: The Intercepting Ward"
description: "Regulate and validate boundary access to critical array structures."
type: futhark
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Geometry"
formula: |2
  let proxy_access [n] (arr: [n]i32) (idx: i64) : i32 =
    if idx >= 0 && idx < n then arr[idx] else -1
tags: [futhark, proxy, bounds]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
