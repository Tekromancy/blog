---
title: The Command
description: Encapsulating a spell execution as a monolithic data structure, allowing deferred or queued Gallina invocations.
type: coq
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  (* Gallina Ward: Command *)
  Require Import String List.
  Import ListNotations.
  
  (* The Receiver *)
  Record Crystal := {
    charge : nat
  }.
  
  (* Commands are encapsulated state transformations *)
  Definition Command := Crystal -> Crystal.
  
  Definition overchargeCmd : Command := fun c => {| charge := c.(charge) + 100 |}.
  Definition drainCmd : Command := fun c => {| charge := 0 |}.
  
  (* The Invoker processes a queue of commands *)
  Fixpoint executeQueue (queue : list Command) (target : Crystal) : Crystal :=
    match queue with
    | [] => target
    | cmd :: rest => executeQueue rest (cmd target)
    end.
    
  Definition initCrystal := {| charge := 50 |}.
  Definition ritualQueue := [overchargeCmd; overchargeCmd; drainCmd; overchargeCmd].
  Definition finalCrystal := executeQueue ritualQueue initCrystal.
tags: [command, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
