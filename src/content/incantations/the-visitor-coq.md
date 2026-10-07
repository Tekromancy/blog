---
title: The Visitor
description: Separating a complex arcane algorithm from the crystalline structure of the Gallina Wards it traverses.
type: coq
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Surveying"
formula: |2
  (* Gallina Ward: Visitor *)
  Require Import String.
  
  Inductive Element :=
    | NodeCore : nat -> Element
    | NodeEdge : string -> Element.
    
  (* The Visitor defines behaviors for each type of Element *)
  Record Visitor (T : Type) := {
    visitCore : nat -> T;
    visitEdge : string -> T
  }.
  
  Definition accept {T : Type} (e : Element) (v : Visitor T) : T :=
    match e with
    | NodeCore n => v.(visitCore) n
    | NodeEdge s => v.(visitEdge) s
    end.
    
  (* Concrete Visitor: Extracts string representations *)
  Definition stringifyVisitor : Visitor string := {|
    visitCore := fun n => "Core Resonance";
    visitEdge := fun s => "Edge Signature: " ++ s
  |}.
  
  Definition testCore := NodeCore 42.
  Definition result := accept testCore stringifyVisitor.
tags: [visitor, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
