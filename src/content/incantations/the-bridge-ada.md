---
title: The Bridge Incantation
description: Decoupling a ward's abstraction from its deployment implementation.
type: ada
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Abjuration // Deployment Mechanics"
formula: |2
  package Ward_Bridges is

     type Implementor is abstract tagged null record;
     procedure Render_Shield (I : in Implementor) is abstract;

     type Ward_Abstraction is abstract tagged record
        Imp : access Implementor'Class;
     end record;

     procedure Initialize (W : in out Ward_Abstraction) is abstract;

     type Secure_Ward is new Ward_Abstraction with null record;
     overriding procedure Initialize (W : in out Secure_Ward);

  end Ward_Bridges;

  package body Ward_Bridges is
     procedure Initialize (W : in out Secure_Ward) is
     begin
        if W.Imp /= null then
           Render_Shield (W.Imp.all);
        end if;
     end Initialize;
  end Ward_Bridges;
tags: [ada, abjuration, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge pattern allows the high-level intent of a magical shield to vary independently of the low-level rendering matrices. This enables a mage to swap out the energy substrate on the fly without rewriting the protective logic.
