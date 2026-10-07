---
title: The Chain of Responsibility of Snobol
description: Passing the magical request through a lineage of wizards.
type: snobol
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Lineage"
formula: |2
          * Chain of Responsibility in SNOBOL4
          DEFINE('HANDLE_REQUEST(LEVEL, REQ)')

          HANDLE_REQUEST(1, 'LIGHT')
          HANDLE_REQUEST(1, 'METEOR')
          :(END)

  HANDLE_REQUEST
          IDENT(LEVEL, 1) IDENT(REQ, 'LIGHT') :S(H1)
          IDENT(LEVEL, 1) :S(PASS_TO_2)
  H1      OUTPUT = 'Apprentice handled ' REQ :(RETURN)

  PASS_TO_2
          IDENT(LEVEL, 2) IDENT(REQ, 'METEOR') :S(H2)
          OUTPUT = 'Archmage handles ' REQ :(RETURN)
  H2      OUTPUT = 'Archmage handled ' REQ :(RETURN)
  END
tags: [snobol, behavioral, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility routes a mystical request up the hierarchy. If an apprentice lacks the power, the execution pointer cascades upward until a capable Archmage resolves the conjuration.
