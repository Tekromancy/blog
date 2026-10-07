---
title: The Composite
description: A hierarchy of magical wards, where a cluster of wards is treated exactly the same as a single ward.
type: inform7
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Abjuration // Prose-Based Spellcasting"
formula: |2
  A ward is a kind of thing.
  
  To evaluate the strength of (W - a ward):
      say "Evaluating a basic ward.";
      decide on 10.
      
  A ward cluster is a kind of ward.
  A ward cluster can contain other wards. [Inform 7 native containment tree]
  
  To evaluate the strength of (C - a ward cluster):
      let the total strength be 0;
      repeat with the sub-ward running through things enclosed by C:
          if the sub-ward is a ward:
              increase the total strength by the strength evaluation of the sub-ward;
      decide on the total strength.
      
  To decide what number is the strength evaluation of (W - a ward):
      [This rule acts as the polymorphic interface]
      if W is a ward cluster:
          decide on the strength of W;
      else:
          decide on 10.
tags: [structural, abjuration, composite, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
