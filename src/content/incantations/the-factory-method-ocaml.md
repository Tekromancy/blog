---
title: The Factory Method
description: Delegating the manifestation of mystical entities to specific lineage functions.
type: ocaml
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity Summoning"
formula: |2
  type familiar = Raven | Toad | Cat

  module type WITCH = sig
    val summon_familiar : unit -> familiar
  end

  module SwampWitch : WITCH = struct
    let summon_familiar () = Toad
  end

  module SkyWitch : WITCH = struct
    let summon_familiar () = Raven
  end
tags: [Caml Metamagic, Abstract Types, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method manifests as specialized modules that dictate the exact lineage of familiar summoned, hidden behind an abstract signature.
