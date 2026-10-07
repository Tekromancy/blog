---
title: The Observer
description: Subscribing scrying orbs to ethereal shockwaves.
type: ocaml
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Scrying Network
formula: |
  type event = ManaSurge | VoidCollapse
  type observer = event -> unit
  
  let create_subject () =
    let observers = ref [] in
    let attach obs = observers := obs :: !observers in
    let notify ev = List.iter (fun f -> f ev) !observers in
    (attach, notify)
    
  let attach, notify = create_subject ()
  let () = attach (fun ev -> print_endline "Orb 1 detected event!")
tags: [Caml Metamagic, Callbacks, Mutability, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Observer is implemented through callback lists inside mutable references, allowing scrying nodes to react to events across the psychic network.
