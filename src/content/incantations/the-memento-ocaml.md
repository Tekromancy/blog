---
title: The Memento
description: Capturing temporal snapshots of a sorcerer's state for chronomantic restoration.
type: ocaml
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Reversal"
formula: |2
  module ChronoVault : sig
    type state
    type memento
    val save : state -> memento
    val restore : memento -> state
  end = struct
    type state = { mana : int; health : int }
    type memento = state 
    let save s = { mana = s.mana; health = s.health }
    let restore m = m
  end
tags: [Caml Metamagic, Abstract Types, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By hiding the Memento behind an abstract signature, we prevent lesser wizards from tampering with the temporal timeline directly, preserving the integrity of chronomancy.
