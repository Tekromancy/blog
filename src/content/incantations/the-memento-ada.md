---
title: The Memento Incantation
description: Capturing and restoring a shield's internal state without violating encapsulation.
type: ada
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Abjuration // Temporal Anchors
formula: |
  package Ward_Mementos is
  
     type Memento is private;
     
     type Originator is tagged private;
     function Save_State (O : Originator) return Memento;
     procedure Restore_State (O : in out Originator; M : Memento);
     
  private
     type Memento is record
        Harmonic_Value : Integer;
     end record;
     
     type Originator is tagged record
        Harmonic_Value : Integer := 100;
     end record;
  end Ward_Mementos;
  
  package body Ward_Mementos is
     function Save_State (O : Originator) return Memento is
     begin
        return Memento'(Harmonic_Value => O.Harmonic_Value);
     end Save_State;
     
     procedure Restore_State (O : in out Originator; M : Memento) is
     begin
        O.Harmonic_Value := M.Harmonic_Value;
     end Restore_State;
  end Ward_Mementos;
tags: [ada, abjuration, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
If an experimental flux damages the shield, the Memento serves as a temporal anchor. It holds the pure, untainted harmonic values captured before the engagement, allowing the matrix to revert to a mathematically sound state effortlessly.
