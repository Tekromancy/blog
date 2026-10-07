---
title: "Iterator in PostScript"
description: "Traverse an array of page spirits sequentially without exposing their raw structure."
type: postscript
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Array Scrying"
formula: |2
  % Iterator in PostScript
  /PageIterator <<
    /pages [ (Title Page) (Tome Body) (Index) ]
    /idx 0
    /hasNext { dup /idx get exch /pages get length lt }
    /next {
      dup /pages get 1 index /idx get get
      exch dup /idx get 1 add /idx exch put
    }
  >> def
  
  {
    PageIterator /hasNext get exec not { exit } if
    PageIterator /next get exec =
  } loop
tags: [postscript, print-daemon, behavioral, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# Iterator: Sequential Scrying

Exposing the raw arrays and composite trees of your document model invites tampering by chaotic memory spirits. The Iterator encapsulates the traversal logic, allowing the print loop to cleanly ask if there is a next page, and to retrieve it safely, shielding the inner workings from the rest of the grimoire.
