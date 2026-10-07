---
title: The Iterator of Snobol
description: Walking the hidden paths of a string element by element.
type: snobol
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Seeking"
formula: |2
          * Iterator Pattern in SNOBOL4
          SPELL_COMPONENTS = 'Eye_of_Newt,Toe_of_Frog,Wool_of_Bat,'

  NEXT_ITEM
          SPELL_COMPONENTS BREAK(',') . ITEM ',' = '' :F(DONE)
          OUTPUT = 'Adding component: ' ITEM
          :(NEXT_ITEM)
  DONE
          OUTPUT = 'Potion complete.'
  END
tags: [snobol, behavioral, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To iterate through a collection in SNOBOL, one often repeatedly destroys the collection using pattern replacement. `BREAK` consumes the string until a delimiter is found, yielding the current item and advancing the cursor magically.
