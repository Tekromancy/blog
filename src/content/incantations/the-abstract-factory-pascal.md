---
title: The Abstract Factory
description: A rigid warding structure for generating families of arcane sigils.
type: pascal
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Wardcraft"
formula: |2
  unit AbstractFactory;
  interface
  type
    IWard = interface
      procedure Cast;
    end;
    IWardFactory = interface
      function CreateFireWard: IWard;
      function CreateFrostWard: IWard;
    end;
  implementation
  end.
tags: [creation, wards, rigid]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An academic approach to instantiating families of arcane defenses, ensuring rigorous type boundaries.
