---
title: Phantom Terminals of VTAM
description: Share VTAM terminal definitions efficiently.
type: rexx
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Phantoms"
formula: |2
  /* ooRexx Flyweight */
  ::class TerminalDef
  ::attribute type
  ::method init
    use arg type
    self~type = type

  ::class TerminalFactory
  ::attribute cache
  ::method init
    self~cache = .directory~new()
  ::method getTerminal
    use arg type
    if self~cache[type] = .nil then do
      self~cache[type] = .TerminalDef~new(type)
    end
    return self~cache[type]
tags: [flyweight, vtam, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When thousands of spectral terminals connect via VTAM, the Flyweight prevents the memory from shattering by sharing the core definition among the echoes.
