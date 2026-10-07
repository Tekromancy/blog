---
title: The Visitor
description: An external inspector navigating complex magical constructs to perform operations.
type: pascal
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  unit VisitorPattern;
  interface
  type
    IGlyphElement = interface
      procedure Accept(Visitor: IObject);
    end;
  implementation
  end.
tags: [inspection, external, operations]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Separates the algorithm of inspection from the rigorous object structure it traverses.
