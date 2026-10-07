---
title: The Flyweight
description: Conserving magical energy by sharing immutable soul-fragments.
type: ocaml
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Essence Conservation"
formula: |2
  module SoulForge = struct
    let cache = Hashtbl.create 16

    let get_fragment essence =
      match Hashtbl.find_opt cache essence with
      | Some frag -> frag
      | None ->
          let frag = "Fragment of " ^ essence in
          Hashtbl.add cache essence frag;
          frag
  end
tags: [Caml Metamagic, Memoization, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Flyweight pattern conserves ethereal resources by utilizing a hash table to memoize and share immutable essence fragments across the realm.
