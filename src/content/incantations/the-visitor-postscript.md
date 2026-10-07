---
title: "Visitor in PostScript"
description: "Apply an external operation over different shape spirits without altering their innate code."
type: postscript
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shape Scanning"
formula: |2
  % Visitor in PostScript
  /AuraVisitor <<
    /visitCircle { (Applying Circular Aura Matrix...\n) print }
    /visitSquare { (Applying Orthogonal Aura Matrix...\n) print }
  >> def
  
  /MyCircle << /accept { AuraVisitor /visitCircle get exec } >> def
  /MySquare << /accept { AuraVisitor /visitSquare get exec } >> def
  
  MyCircle /accept get exec
  MySquare /accept get exec
tags: [postscript, print-daemon, behavioral, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# Visitor: The External Scrutiny

When your grimoire is filled with dozens of geometric classes, adding a new functionality—such as hit-detection or bounding-box calculation—across all of them is an intrusive nightmare. The Visitor isolates this new operation, traversing the structure and performing specialized logic based on the entity it encounters, maintaining code purity.
