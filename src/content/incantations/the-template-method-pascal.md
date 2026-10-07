---
title: The Template Method
description: A rigid skeletal ritual where only specific incantations can be substituted.
type: pascal
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Ritual
formula: |
  unit TemplatePattern;
  interface
  type
    TRitual = class
    protected
      procedure Prepare; virtual; abstract;
      procedure Conclude; virtual; abstract;
    public
      procedure ExecuteRitual;
    end;
  implementation
  end.
tags: [skeleton, ritual, strict-flow]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Defines the absolute structure of an algorithm, leaving particular steps to be defined by acolytes.
