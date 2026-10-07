---
title: The Singleton
description: A singular locus of magical power, strictly guarded against multiple manifestations.
type: pascal
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Locus"
formula: |2
  unit SingletonPattern;
  interface
  type
    T LeyLineNexus = class
    private
      constructor Create;
    public
      class function GetInstance: TLeyLineNexus;
    end;
  implementation
  end.
tags: [unique, locus, strict-boundary]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Ensures only one instance of a volatile metaphysical resource can ever exist in the current plane.
