---
title: The Factory Method
description: Delegating the precise nature of summoned familiars to subclasses.
type: pascal
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Summoning
formula: |
  unit FactoryMethodPattern;
  interface
  type
    IFamiliar = interface
      procedure Manifest;
    end;
    TSummoner = class
      function SummonFamiliar: IFamiliar; virtual; abstract;
    end;
  implementation
  end.
tags: [creation, familiar, strict]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Structured instantiation through polymorphic summoning routines.
