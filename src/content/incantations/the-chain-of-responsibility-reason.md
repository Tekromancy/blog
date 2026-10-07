---
title: Chain of Responsibility in ReasonML
description: Pipelining optionals until a handler catches the spell.
type: reason
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Compulsion"
formula: |2
  let handleFire = (req) => req == "Fire" ? Some("Burned") : None;
  let handleWater = (req) => req == "Water" ? Some("Doused") : None;

  let rec processReq = (req, handlers) =>
    switch (handlers) {
    | [] => "Unhandled"
    | [h, ...rest] =>
      switch (h(req)) {
      | Some(res) => res
      | None => processReq(req, rest)
      }
    };
tags: [reason, chain-of-responsibility, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using recursive lists of functions and `option` types, a request trickles through the chain until a valid transmutation occurs.
