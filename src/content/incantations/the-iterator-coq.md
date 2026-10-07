---
title: The Iterator
description: Traversing a crystalline structure of Gallina Wards sequentially without exposing its esoteric internal topology.
type: coq
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  (* Gallina Ward: Iterator *)
  Require Import List.
  Import ListNotations.
  
  (* In purely functional Gallina, iterators are often modeled as lists or streams 
     that yield the next state via recursion. *)
  
  Record Iterator (A : Type) := {
    current : option A;
    next : unit -> Iterator A
  }.
  
  Fixpoint list_to_iterator {A : Type} (l : list A) : Iterator A :=
    match l with
    | [] => {| current := None; next := fun _ => list_to_iterator [] |}
    | x :: xs => {| current := Some x; next := fun _ => list_to_iterator xs |}
    end.
    
  Definition wardCollection : list nat := [10; 20; 30].
  Definition iter0 := list_to_iterator wardCollection.
  Definition iter1 := iter0.(next) tt.
tags: [iterator, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
