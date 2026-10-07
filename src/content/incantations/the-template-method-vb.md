---
title: The Template Method of Base Classes
description: Defining the skeleton of a ritual while delegating the specifics.
type: vb
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Scaffolding"
formula: |2
  ' AbstractRitual.cls (Simulated via interfaces and delegation)
  Public Sub ExecuteRitual(impl As IRitualSteps)
      On Error Resume Next
      impl.StepOne_Prepare()
      impl.StepTwo_Summon()
      impl.StepThree_Banish()
  End Sub

  ' IRitualSteps.cls
  Public Sub StepOne_Prepare()
  End Sub
  Public Sub StepTwo_Summon()
  End Sub
  Public Sub StepThree_Banish()
  End Sub
tags: [template-method, delegation, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Since VB6 lacks true inheritance, the Template Method is simulated by having a controller class dictate the sequence of operations, calling into a delegated interface that concrete classes implement.
