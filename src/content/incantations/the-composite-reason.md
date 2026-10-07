---
title: Composite in ReasonML
description: Recursive variant types for hierarchical DOM hexes.
type: reason
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  type uiNode =
    | Text(string)
    | Box(list(uiNode));

  let rec renderNode = (n) =>
    switch (n) {
    | Text(s) => s
    | Box(children) => "[" ++ String.concat(", ", List.map(renderNode, children)) ++ "]"
    };
tags: [reason, composite, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Trees of UI components form a composite structure, seamlessly traversed by recursive functions and pattern matching.
