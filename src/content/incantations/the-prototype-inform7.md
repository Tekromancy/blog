---
title: The Prototype
description: A spell of duplication that creates exact copies of an existing magical artifact.
type: inform7
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Prose-Based Spellcasting"
formula: |2
  A magical artifact is a kind of thing. A magical artifact has a number called the power level. A magical artifact has a text called the true name.
  
  To decide which magical artifact is a clone of (original - a magical artifact):
      let the duplicate be a new magical artifact;
      now the power level of the duplicate is the power level of the original;
      now the true name of the duplicate is the true name of the original;
      decide on the duplicate.
      
  To cast the mirroring spell on (target - a magical artifact):
      let the echo be a clone of the target;
      move the echo to the location of the target;
      say "A perfect replica of [the target] shimmers into existence."
tags: [creational, illusion, prototype, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
