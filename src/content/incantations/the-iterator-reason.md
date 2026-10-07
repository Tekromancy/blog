---
title: Iterator in ReasonML
description: Lazily traversing ethereal sequences.
type: reason
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  type iterator('a) = unit => option('a);

  let rec makeRange = (start, stop): iterator(int) => {
    let curr = ref(start);
    () => {
      if (curr^ <= stop) {
        let v = curr^;
        curr := curr^ + 1;
        Some(v);
      } else {
        None;
      }
    };
  };
tags: [reason, iterator, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Iterators are functions closing over state, emitting `Some(val)` until the stream of magical energy is exhausted (`None`).
