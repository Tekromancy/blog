---
title: The Strategy Incantation
description: Swapping defensive algorithms on the fly to match the attacker's vector.
type: ada
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Abjuration // Algorithm Shifting"
formula: |2
  package Defense_Strategies is

     type Strategy is abstract tagged null record;
     procedure Deflect (S : in Strategy; Force : Float) is abstract;

     type Harmonic_Dampening is new Strategy with null record;
     overriding procedure Deflect (S : in Harmonic_Dampening; Force : Float);

     type Hard_Light_Barrier is new Strategy with null record;
     overriding procedure Deflect (S : in Hard_Light_Barrier; Force : Float);

     type Matrix is tagged record
        Current_Strategy : access Strategy'Class;
     end record;

     procedure Execute_Defense (M : in Matrix; Force : Float);

  end Defense_Strategies;

  package body Defense_Strategies is
     procedure Deflect (S : in Harmonic_Dampening; Force : Float) is begin null; end;
     procedure Deflect (S : in Hard_Light_Barrier; Force : Float) is begin null; end;

     procedure Execute_Defense (M : in Matrix; Force : Float) is
     begin
        if M.Current_Strategy /= null then
           Deflect (M.Current_Strategy.all, Force);
        end if;
     end Execute_Defense;
  end Defense_Strategies;
tags: [ada, abjuration, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An energy weapon requires harmonic dampening, while a railgun slug demands hard-light barriers. The Strategy pattern lets the tactical matrix hot-swap algorithms instantaneously, always countering the aggressor with mathematically perfect opposition.
