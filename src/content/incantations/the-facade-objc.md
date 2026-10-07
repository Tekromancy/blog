---
title: The Facade
description: A simplified sigil for a tangled weave of subsystems.
type: objc
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Subschool: Simplicity"
formula: |2
  @interface TKLeyline : NSObject
  - (void)tapPower;
  @end
  @implementation TKLeyline
  - (void)tapPower {}
  @end

  @interface TKCrystal : NSObject
  - (void)focus;
  @end
  @implementation TKCrystal
  - (void)focus {}
  @end

  @interface TKRitualFacade : NSObject
  - (void)performRitual;
  @end
  @implementation TKRitualFacade
  - (void)performRitual {
      TKLeyline *leyline = [TKLeyline new];
      TKCrystal *crystal = [TKCrystal new];
      [leyline tapPower];
      [crystal focus];
  }
  @end
tags: [objc, facade, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Facade hides the chaotic tangle of leylines, crystals, and incantations behind a single, elegant ritual interface.
