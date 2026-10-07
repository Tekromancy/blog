---
title: "The Interpreter of the Black Speech"
description: "Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language."
type: foxpro
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Reading"
formula: |2
  DEFINE CLASS Context AS Custom
      InputString = ""
      OutputValue = 0
  ENDDEFINE

  DEFINE CLASS Expression AS Custom
      PROCEDURE Interpret(oContext)
      ENDPROC
  ENDDEFINE

  DEFINE CLASS BloodRuneExpression AS Expression
      PROCEDURE Interpret(oContext)
          IF "BLOOD" $ oContext.InputString
              oContext.OutputValue = oContext.OutputValue + 100
              oContext.InputString = STRTRAN(oContext.InputString, "BLOOD", "", 1, 1)
          ENDIF
      ENDPROC
  ENDDEFINE

  DEFINE CLASS BoneRuneExpression AS Expression
      PROCEDURE Interpret(oContext)
          IF "BONE" $ oContext.InputString
              oContext.OutputValue = oContext.OutputValue + 10
              oContext.InputString = STRTRAN(oContext.InputString, "BONE", "", 1, 1)
          ENDIF
      ENDPROC
  ENDDEFINE
tags: [behavioral, interpreter, language, grammar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Interpreter dissects the grim syntax of the Black Speech. By mapping dark runes to executable evaluations, it parses prophecies into actionable mutations within the system state.
