---
title: The Prototype
description: Cloning existing mana constructs without re-invoking their creation runes.
type: pascal
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Replication"
formula: |2
  unit PrototypePattern;
  interface
  type
    ICloneableSpell = interface
      function Clone: ICloneableSpell;
    end;
  implementation
  end.
tags: [cloning, structured, spells]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Perfect geometric replication of existing engrammatic state in memory.
