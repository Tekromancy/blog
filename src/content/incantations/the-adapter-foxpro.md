---
title: "The Adapter of Ancient Grimoires"
description: "Convert the interface of a forgotten tomb into another interface clients expect."
type: foxpro
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  * The interface we expect
  DEFINE CLASS INewRitual AS Custom
      PROCEDURE ExecuteRitual()
      ENDPROC
  ENDDEFINE

  * The ancient code we must use
  DEFINE CLASS AncientScroll AS Custom
      PROCEDURE ChantOldWords(cWords)
          ? "Chanting ancient runes: " + cWords
      ENDPROC
  ENDDEFINE

  * The Adapter
  DEFINE CLASS ScrollAdapter AS INewRitual
      oOldScroll = .NULL.

      PROCEDURE Init
          THIS.oOldScroll = CREATEOBJECT("AncientScroll")
      ENDPROC

      PROCEDURE ExecuteRitual()
          THIS.oOldScroll.ChantOldWords("GOTO TOP... REPLACE ALL")
      ENDPROC
  ENDDEFINE
tags: [structural, adapter, wrapper, legacy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

FoxPro is a language of deep ancestry. The Adapter binds the cryptic calls of the old masters into a modern shape, preventing the madness of exposing raw table operations to your higher logic.
