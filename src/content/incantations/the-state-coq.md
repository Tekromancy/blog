---
title: The State
description: Mutating a Gallina Ward's behavior in real-time by seamlessly shifting its internal state machine configurations.
type: coq
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  (* Gallina Ward: State *)
  Require Import String.
  
  Inductive WardPhase :=
    | Dormant
    | Active
    | Overloaded.
    
  Record WardContext := {
    phase : WardPhase;
    energy : nat
  }.
  
  Definition absorbEnergy (ctx : WardContext) (amount : nat) : WardContext :=
    let newEnergy := ctx.(energy) + amount in
    match ctx.(phase) with
    | Dormant => 
        if Nat.leb 10 newEnergy then {| phase := Active; energy := newEnergy |}
        else {| phase := Dormant; energy := newEnergy |}
    | Active =>
        if Nat.leb 100 newEnergy then {| phase := Overloaded; energy := newEnergy |}
        else {| phase := Active; energy := newEnergy |}
    | Overloaded => {| phase := Overloaded; energy := newEnergy |} (* Locked state *)
    end.
tags: [state, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
