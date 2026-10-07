---
title: The Mediator of Snobol
description: A central crystal ball directing the flow of arcane energies.
type: snobol
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Networking"
formula: |2
          * Mediator Pattern in SNOBOL4
          DEFINE('MEDIATE(SENDER, MSG)')

          MEDIATE('Warlock', 'Summon')
          MEDIATE('Cleric', 'Heal')
          :(END)

  MEDIATE
          IDENT(SENDER, 'Warlock') :S(HANDLE_W)
          IDENT(SENDER, 'Cleric') :S(HANDLE_C)
          :(RETURN)

  HANDLE_W
          OUTPUT = 'Mediator routes Dark Energy for ' MSG :(RETURN)

  HANDLE_C
          OUTPUT = 'Mediator routes Light Energy for ' MSG :(RETURN)
  END
tags: [snobol, behavioral, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than having entities communicate directly in chaotic cross-currents, the Mediator acts as a central hub—a crystal ball that interprets and routes all spells to their proper ethereal planes.
