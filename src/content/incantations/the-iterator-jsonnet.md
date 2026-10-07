---
title: The Iterator of Jsonnet
description: Sequentially accessing elements of a collection.
type: jsonnet
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Tracing"
formula: |2
  local ProcessList(list, fn) =
    [fn(item) for item in list];

  local Collection = [1, 2, 3, 4];
  
  {
    doubled: ProcessList(Collection, function(x) x * 2),
    strings: ProcessList(Collection, function(x) "Item " + x)
  }
tags: [behavioral, iterator, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
List comprehensions provide a powerful form of iteration natively in Jsonnet, allowing the transformation of arrays effortlessly through functional mapping.
