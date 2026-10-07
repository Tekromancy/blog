---
title: The Prototype Incantation
description: Cloning proven ward structures to rapidly multiply defenses without recompilation.
type: ada
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Abjuration // Replication"
formula: |2
  package Ward_Prototypes is

     type Prototypal_Ward is abstract tagged null record;
     function Clone (W : Prototypal_Ward) return Prototypal_Ward is abstract;
     procedure Cast (W : in Prototypal_Ward) is abstract;

     type Plasma_Shield is new Prototypal_Ward with record
        Intensity : Float;
     end record;

     overriding function Clone (W : Plasma_Shield) return Prototypal_Ward;
     overriding procedure Cast (W : in Plasma_Shield);

  end Ward_Prototypes;

  package body Ward_Prototypes is
     function Clone (W : Plasma_Shield) return Prototypal_Ward is
     begin
        return Plasma_Shield'(Intensity => W.Intensity);
     end Clone;

     procedure Cast (W : in Plasma_Shield) is
     begin
        null; -- Engage plasma fields
     end Cast;
  end Ward_Prototypes;
tags: [ada, abjuration, replication]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When a perimeter is breached, there is no time to calculate new wards from first principles. The Prototype incantation allows an Adept to clone an already-validated plasma shield, multiplying defenses instantly while preserving structural integrity.
