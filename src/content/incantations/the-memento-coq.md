---
title: The Memento
description: Capturing and restoring a Gallina Ward's internal arcane resonance without violating strict functional boundaries.
type: coq
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Chronomancy"
formula: |2
  (* Gallina Ward: Memento *)
  Require Import String.
  
  (* The Memento stores the internal state *)
  Record Memento := {
    savedResonance : nat;
    savedSigil : string
  }.
  
  Record Originator := {
    resonance : nat;
    sigil : string
  }.
  
  Definition saveState (o : Originator) : Memento := {|
    savedResonance := o.(resonance);
    savedSigil := o.(sigil)
  |}.
  
  Definition restoreState (m : Memento) : Originator := {|
    resonance := m.(savedResonance);
    sigil := m.(savedSigil)
  |}.
  
  Definition activeWard := {| resonance := 100; sigil := "Vortex" |}.
  Definition wardSnapshot := saveState activeWard.
  (* State gets modified elsewhere... *)
  Definition restoredWard := restoreState wardSnapshot.
tags: [memento, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
