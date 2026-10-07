---
title: Iterator in Verse
description: Epic Metaverse Magic for Iterator.
type: verse
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  iterator := interface:
      Next()<public>:?string
      
  inventory_iterator := class(iterator):
      var Items<public>:[]string
      var Index<public>:int = 0
      Next()<override>:?string:
          if (Item := Items[Index]):
              set Index += 1
              option{Item}
          else:
              false
tags: [Iterator, verse, metaverse, magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Arcane Iterator

In the shifting geometries of the Metaverse, the **Iterator** incantation allows a master chronomancer to weave digital fabric with perfect elegance. By leveraging this ancient pattern, your Verse scripts will hum with raw, unbridled cyber-magic, ready to deploy into any island's grid.
