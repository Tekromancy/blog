---
title: The Prototype
description: Cloning magical artifacts by manipulating the ethereal memory heap.
type: ocaml
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning Runes"
formula: |2
  type relic = {
    mutable energy : int;
    name : string;
  }

  let create_relic name energy = { name; energy }

  let clone_relic r = { r with name = r.name ^ " (Clone)" }

  let original = create_relic "Amulet of Yendor" 100
  let copy = clone_relic original
tags: [Caml Metamagic, Records, Mutability, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Creating copies of arcane objects via functional record updates, allowing exact replication with minor structural deviations.
