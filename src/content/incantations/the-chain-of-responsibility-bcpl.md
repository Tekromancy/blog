---
title: The Chain of the Void Tribunal
description: Pass arcane judgments along a sequence of increasingly powerful void entities.
type: bcpl
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Judgment"
formula: |2
  GET "libhdr"

  MANIFEST $(
    RANK_ACOLYTE = 1
    RANK_LICH = 2
    RANK_OVERLORD = 3
  $)

  LET HandleRequest(rank, threatLevel) BE $(
    SWITCHON rank INTO $(
      CASE RANK_ACOLYTE:
        IF threatLevel <= 10 THEN writef("Acolyte banishes the minor threat.*n")
        ELSE $(
          writef("Acolyte cannot handle threat. Escalating to Lich.*n")
          HandleRequest(RANK_LICH, threatLevel)
        $)
        ENDCASE
      CASE RANK_LICH:
        IF threatLevel <= 50 THEN writef("Lich drains the threat's essence.*n")
        ELSE $(
          writef("Lich cannot handle threat. Escalating to Overlord.*n")
          HandleRequest(RANK_OVERLORD, threatLevel)
        $)
        ENDCASE
      CASE RANK_OVERLORD:
        writef("Overlord obliterates the threat into the Ancestral Void.*n")
        ENDCASE
    $)
  $)

  LET START() BE $(
    writef("Processing Threat Level 5:*n")
    HandleRequest(RANK_ACOLYTE, 5)
    writef("*nProcessing Threat Level 30:*n")
    HandleRequest(RANK_ACOLYTE, 30)
    writef("*nProcessing Threat Level 9000:*n")
    HandleRequest(RANK_ACOLYTE, 9000)
  $)
tags: [chain-of-responsibility, tribunal, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
