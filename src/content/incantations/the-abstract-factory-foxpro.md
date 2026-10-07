---
title: "The Abstract Factory of Necromantic Cursors"
description: "Summon families of related apparitions without specifying their concrete manifestations."
type: foxpro
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // XBase Necromancy"
formula: |2
  DEFINE CLASS CryptFactory AS Custom
      FUNCTION CreateSpectre()
          RETURN .NULL.
      ENDFUNC

      FUNCTION CreateBanshee()
          RETURN .NULL.
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS WraithFactory AS CryptFactory
      FUNCTION CreateSpectre()
          RETURN CREATEOBJECT("WraithSpectre")
      ENDFUNC

      FUNCTION CreateBanshee()
          RETURN CREATEOBJECT("WraithBanshee")
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS WraithSpectre AS Custom
      PROCEDURE Moan
          ? "The wraith specter wails through the dead records."
      ENDPROC
  ENDDEFINE

  DEFINE CLASS WraithBanshee AS Custom
      PROCEDURE Shriek
          ? "The wraith banshee locks the table in agony!"
      ENDPROC
  ENDDEFINE
tags: [creational, abstract-factory, xbase, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory channels the spirits of related apparitions, guaranteeing that combinations of undead cursors operate in harmony without tying the summoner to their direct forms.
