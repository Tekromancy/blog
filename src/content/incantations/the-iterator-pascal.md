---
title: The Iterator
description: Sequentially parsing a multi-dimensional array of souls.
type: pascal
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Necromancy // Traversal"
formula: |2
  unit IteratorPattern;
  interface
  type
    ISoulIterator = interface
      function HasNext: Boolean;
      function Next: string;
    end;
  implementation
  end.
tags: [traversal, sequence, strict]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Academic exploration of a collection without exposing its underlying esoteric structure.
