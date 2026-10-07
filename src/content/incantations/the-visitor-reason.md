---
title: Visitor in ReasonML
description: Traversing ASTs with external pattern matching functions.
type: reason
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Exploration"
formula: |2
  type element = NodeA | NodeB(string);

  let visit = (el) =>
    switch (el) {
    | NodeA => "Visited A"
    | NodeB(s) => "Visited B with " ++ s
    };
tags: [reason, visitor, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Visitor pattern is arguably the most fundamental capability of ReasonML: pattern matching over discriminated unions perfectly decouples data from operations.
