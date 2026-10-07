---
title: The Singleton
description: Ensuring absolute uniqueness of a Gallina Ward through dependent types and proof irrelevance.
type: coq
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Monolith"
formula: |2
  (* Gallina Ward: Singleton *)
  Require Import Coq.Logic.ProofIrrelevance.
  
  (* We define a type that can only have exactly one inhabitant, verified by proofs *)
  Inductive Core : Type :=
    | TheOneCore.
    
  Lemma core_is_unique : forall (c1 c2 : Core), c1 = c2.
  Proof.
    intros c1 c2.
    destruct c1. destruct c2. reflexivity.
  Qed.
  
  (* A singleton type class instance *)
  Class GlobalNexus := {
    nexus_id : nat;
    nexus_is_zero : nexus_id = 0
  }.
  
  Instance TheNexus : GlobalNexus := {
    nexus_id := 0;
    nexus_is_zero := eq_refl
  }.
tags: [singleton, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
