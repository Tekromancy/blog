---
title: The Prototype of Snobol
description: Cloning ancient texts using SNOBOL string copy mechanisms.
type: snobol
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
          * Prototype in SNOBOL4
          SPELL_SCROLL = 'Ancient Spell of Fireball'

          * Cloning the scroll
          SCROLL_COPY = SPELL_SCROLL

          * Modifying the copy
          SCROLL_COPY 'Fire' = 'Ice'

          OUTPUT = 'Original: ' SPELL_SCROLL
          OUTPUT = 'Copy: ' SCROLL_COPY
  END
tags: [snobol, creational, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype pattern is innate to SNOBOL's string handling. By creating a copy of a base string, we can magically mutate the clone using pattern replacement without altering the primordial original.
