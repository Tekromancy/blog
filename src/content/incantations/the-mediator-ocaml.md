---
title: The Mediator
description: Coordinating the dance of elemental spirits to prevent chaotic clashes.
type: ocaml
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Elemental Harmony"
formula: |2
  module type SPIRIT = sig
    val receive : string -> unit
  end

  module Nexus = struct
    let spirits = ref []
    let register s = spirits := s :: !spirits
    let broadcast msg sender_id =
      List.iter (fun s -> s msg) !spirits
  end
tags: [Caml Metamagic, State, Coordination, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator pattern is a centralized Nexus module, ensuring diverse elemental spirits communicate synchronously without binding their essences directly together.
