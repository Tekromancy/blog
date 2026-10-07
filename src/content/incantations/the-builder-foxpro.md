---
title: "The Builder of Bone Structures"
description: "Separate the construction of a complex DBF skeleton from its spectral representation."
type: foxpro
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Bone Weaving"
formula: |2
  DEFINE CLASS DBFBuilder AS Custom
      cStructure = ""

      PROCEDURE AddField(cName, cType, nLength, nDecimals)
          THIS.cStructure = THIS.cStructure + cName + " " + cType + "(" + TRANSFORM(nLength) + "), "
      ENDPROC

      FUNCTION GetResult()
          RETURN LEFT(THIS.cStructure, LEN(THIS.cStructure)-2)
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS Director AS Custom
      PROCEDURE Construct(oBuilder)
          oBuilder.AddField("ID", "I", 4, 0)
          oBuilder.AddField("SOUL_NAME", "C", 50, 0)
          oBuilder.AddField("PURGATORY_YEARS", "N", 8, 0)
      ENDPROC
  ENDDEFINE

  * Usage
  * oBuilder = CREATEOBJECT("DBFBuilder")
  * oDirector = CREATEOBJECT("Director")
  * oDirector.Construct(oBuilder)
  * ? oBuilder.GetResult()
tags: [creational, builder, structure, xbase]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder separates the grisly assembly of an entity's structure from the final ritual. Use this to construct complex table schemas step-by-step before breathing unlife into the cursor.
