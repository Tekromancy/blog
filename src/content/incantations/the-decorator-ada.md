---
title: The Decorator Incantation
description: Dynamically attaching new defensive properties to an active shield.
type: ada
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Dynamic Shielding"
formula: |2
  package Shield_Decorators is

     type Base_Shield is abstract tagged null record;
     procedure Defend (S : in Base_Shield) is abstract;

     type Core_Shield is new Base_Shield with null record;
     overriding procedure Defend (S : in Core_Shield);

     type Decorator is abstract new Base_Shield with record
        Component : access Base_Shield'Class;
     end record;

     type EMP_Hardened_Decorator is new Decorator with null record;
     overriding procedure Defend (S : in EMP_Hardened_Decorator);

  end Shield_Decorators;

  package body Shield_Decorators is
     procedure Defend (S : in Core_Shield) is
     begin
        null; -- Basic defense
     end Defend;

     procedure Defend (S : in EMP_Hardened_Decorator) is
     begin
        if S.Component /= null then
           Defend (S.Component.all);
        end if;
        -- Add EMP hardening effects
     end Defend;
  end Shield_Decorators;
tags: [ada, abjuration, decorators]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In shifting combat scenarios, a static shield is a broken shield. The Decorator allows combat mages to wrap existing abjurations in new conditional layers—like EMP hardening or kinetic dampening—without halting the shield's core harmonic function.
