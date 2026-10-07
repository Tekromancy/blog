---
title: The Singleton
description: Ensuring only one instance of an ancient grimoire exists through lazy evaluation and reference cells.
type: ocaml
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Solitary Ward"
formula: |2
  module Grimoire : sig
    type t
    val get_instance : unit -> t
    val read : t -> string
  end = struct
    type t = { secrets : string }

    let instance = lazy { secrets = "Arcane truth" }

    let get_instance () = Lazy.force instance

    let read g = g.secrets
  end
tags: [Caml Metamagic, Lazy Evaluation, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The solitary ward of the Singleton is achieved through the OCaml `lazy` keyword, ensuring the ancient knowledge is summoned only once, yet accessible throughout the realm.
