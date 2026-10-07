---
title: The Builder
description: Step-by-step incantations to assemble complex Gallina Wards through progressive proof-weaving.
type: coq
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Structuring"
formula: |2
  (* Gallina Ward: Builder *)
  Require Import String.
  
  Record Ward := mkWard {
    sigil : string;
    resonance : nat;
    active : bool
  }.
  
  Definition emptyWard : Ward := mkWard "" 0 false.
  
  Definition setSigil (s: string) (w: Ward) : Ward :=
    {| sigil := s; resonance := w.(resonance); active := w.(active) |}.
  
  Definition setResonance (r: nat) (w: Ward) : Ward :=
    {| sigil := w.(sigil); resonance := r; active := w.(active) |}.
  
  Definition activate (w: Ward) : Ward :=
    {| sigil := w.(sigil); resonance := w.(resonance); active := true |}.
  
  Definition cyberWard : Ward :=
    activate (setResonance 42 (setSigil "NeonHex" emptyWard)).
tags: [builder, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
