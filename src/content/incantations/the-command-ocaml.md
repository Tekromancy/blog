---
title: The Command
description: Encapsulating arcane instructions as first-class ethereal entities for delayed execution.
type: ocaml
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delayed Triggers"
formula: |2
  type command = unit -> unit

  let invoke_fireball x y () = Printf.printf "Fireball at %d, %d!\n" x y
  let invoke_heal target () = Printf.printf "Healing %s!\n" target

  let ritual_queue = Queue.create ()

  let () =
    Queue.push (invoke_fireball 10 20) ritual_queue;
    Queue.push (invoke_heal "Thoth") ritual_queue;
    Queue.iter (fun cmd -> cmd ()) ritual_queue
tags: [Caml Metamagic, Closures, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command pattern in OCaml is achieved simply by utilizing closures. Function parameters are bound, and the resulting thunk is queued for later incantation.
