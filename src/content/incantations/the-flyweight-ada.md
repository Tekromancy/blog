---
title: The Flyweight Incantation
description: Sharing massive amounts of fine-grained arcane states efficiently.
type: ada
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Abjuration // Micro-Wards
formula: |
  package Micro_Ward_Flyweights is
  
     type Arcane_State is private;
     
     type Flyweight_Ward is tagged private;
     procedure Render (W : in Flyweight_Ward; Extrinsic_Coords : String);
     
     type Flyweight_Factory is tagged private;
     function Get_Ward (F : in out Flyweight_Factory; Key : String) return Flyweight_Ward;
     
  private
     type Arcane_State is record
        Signature : Integer;
     end record;
     
     type Flyweight_Ward is tagged record
        Intrinsic_State : Arcane_State;
     end record;
     
     type Flyweight_Factory is tagged record
        Cache_Size : Integer := 0;
     end record;
  end Micro_Ward_Flyweights;
tags: [ada, abjuration, efficiency]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When casting thousands of microscopic abjuration nodes to filter airborne toxins, memory consumption is a tactical bottleneck. Flyweight ensures that the intrinsic arcane state is shared, while only the positional coordinates remain distinct.
