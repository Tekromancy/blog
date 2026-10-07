---
title: The Chain of Responsibility
description: Passing a chaotic curse through a hierarchy of purifiers.
type: pascal
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Abjuration // Purifying
formula: |
  unit ChainPattern;
  interface
  type
    TPurifier = class
    protected
      FNext: TPurifier;
    public
      procedure HandleCurse(Severity: Integer); virtual;
    end;
  implementation
  end.
tags: [chain, filtering, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A sequenced warding protocol where each node evaluates and potentially neutralizes an anomaly.
