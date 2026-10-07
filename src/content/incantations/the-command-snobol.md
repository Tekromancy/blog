---
title: The Command of Snobol
description: Encapsulating an incantation into a delayed scroll.
type: snobol
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Sealing"
formula: |2
          * Command Pattern in SNOBOL4
          * We store commands as strings to be EVAL'd later
          CMD_HEAL = 'OUTPUT = "Healing aura activated"'
          CMD_HARM = 'OUTPUT = "Dark bolt fired"'

          * Execute later
          STORED_SPELL = CMD_HEAL
          EVAL(STORED_SPELL)
  END
tags: [snobol, behavioral, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

By treating code as data—strings encapsulating valid SNOBOL instructions—we can store commands on scrolls (variables) and unseal them at will using the primordial `EVAL`.
