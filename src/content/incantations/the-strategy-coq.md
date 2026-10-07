---
title: The Strategy
description: Parameterizing algorithms into interchangeable Gallina Wards, allowing rapid combat adaptation against planar threats.
type: coq
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  (* Gallina Ward: Strategy *)
  Require Import String.
  
  (* The Strategy Interface *)
  Definition RoutingStrategy := nat -> nat -> nat.
  
  Definition aggressiveRoute : RoutingStrategy := fun a b => a * b.
  Definition defensiveRoute : RoutingStrategy := fun a b => a + b.
  Definition evasiveRoute : RoutingStrategy := fun a b => a - b.
  
  Record ArcaneRouter := {
    strategy : RoutingStrategy
  }.
  
  Definition executeRoute (router : ArcaneRouter) (x y : nat) : nat :=
    router.(strategy) x y.
    
  Definition combatRouter := {| strategy := aggressiveRoute |}.
  Definition result := executeRoute combatRouter 10 5.
tags: [strategy, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
