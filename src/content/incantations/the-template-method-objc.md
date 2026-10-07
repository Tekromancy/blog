---
title: The Template Method
description: Defining the skeleton of a ritual, leaving details to acolytes.
type: objc
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Subschool: Rituals"
formula: |2
  @interface TKRitual : NSObject
  - (void)performRitual;
  - (void)prepareAltar;
  - (void)chant;
  - (void)ignite;
  @end
  @implementation TKRitual
  - (void)performRitual {
      [self prepareAltar];
      [self chant];
      [self ignite];
  }
  - (void)prepareAltar { /* Base preparation */ }
  - (void)chant { @throw [NSException exceptionWithName:NSInternalInconsistencyException reason:@"Must override chant" userInfo:nil]; }
  - (void)ignite { /* Base ignition */ }
  @end
tags: [objc, template-method, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Template Method establishes the immutable sequence of a grand ritual. Subclasses must fill in the perilous abstract voids to complete the spell.
