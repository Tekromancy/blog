---
title: The Singleton Incantation in Simula
description: Ensuring only one instance of an ancient relic exists in the simulation.
type: simula
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Singularity"
formula: |2
  Begin
      Class Singleton;
      Begin
          Integer esotericPower;
      End;
      Ref(Singleton) TheOne;
      TheOne :- New Singleton;
  End;
tags: [simula, gof, creational, singularity]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

There can be only one. The Singleton restricts instantiation of a class to a single, globally accessible object—a singular anchor in the turbulent sea of the First Simulation.
