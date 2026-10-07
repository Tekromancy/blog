---
title: Adapter in ReasonML
description: Bridging JS runes with OCaml Web Hexes.
type: reason
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  [@bs.val] external jsFetch: string => Js.Promise.t(string) = "fetch";

  let fetchRune = (url: string): Js.Promise.t(string) => {
    jsFetch(url); /* The Adapter wrapping JS into Reason */
  };
tags: [reason, adapter, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Adapter pattern frequently appears as `external` bindings, translating the chaotic JavaScript void into type-safe ReasonML pacts.
