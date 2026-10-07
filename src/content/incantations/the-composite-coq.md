---
title: The Composite
description: Treating individual Gallina Wards and sprawling ward-networks as a singular, unified construct.
type: coq
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Fractals"
formula: |2
  (* Gallina Ward: Composite *)
  Require Import String List.
  Import ListNotations.
  
  Inductive WardComponent :=
    | LeafWard : string -> nat -> WardComponent
    | WardNode : string -> list WardComponent -> WardComponent.
    
  Fixpoint calculateResonance (w : WardComponent) : nat :=
    match w with
    | LeafWard _ p => p
    | WardNode _ children => 
        fold_right (fun child acc => calculateResonance child + acc) 0 children
    end.
    
  Definition primeNode : WardComponent :=
    WardNode "Nexus" [
      LeafWard "Alpha" 10;
      WardNode "SubNexus" [
        LeafWard "Beta" 20;
        LeafWard "Gamma" 15
      ]
    ].
tags: [composite, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
