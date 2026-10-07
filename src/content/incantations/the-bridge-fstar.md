---
title: The Bridge of Realms
description: Decoupling a spell's abstraction from its planar implementation.
type: fstar
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Planar Binding"
formula: |2
  module Bridge
  
  noeq type plane_impl = {
    channel_energy : int -> string;
  }
  
  noeq type spell_abstraction = {
    impl: plane_impl;
    cast: unit -> string;
  }
  
  let fire_plane : plane_impl = {
    channel_energy = (fun e -> "Fire energy: " ^ string_of_int e);
  }
  
  let fireball (p: plane_impl) : spell_abstraction = {
    impl = p;
    cast = (fun () -> p.channel_energy 100);
  }
tags: [bridge, planes, spells]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Bridging magical abstractions and planar backends, enabling cross-realm spell casting without modifying the core spell logic.
