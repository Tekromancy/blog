---
title: The Template Method of the Dark Ritual
description: Define the skeleton of an ancestral summoning ritual, letting sub-cults implement specific steps.
type: bcpl
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritualism"
formula: |2
  GET "libhdr"

  // The Template Method
  LET PerformRitual(PrepareOffering, ChantRunes, ConsumeSoul) BE $(
    writef("Beginning Ritual...*n")
    PrepareOffering()
    ChantRunes()
    ConsumeSoul()
    writef("Ritual Complete. The Void answers.*n")
  $)

  // Blood Cult Implementation
  LET BloodPrepare() BE writef(" Drawing fresh blood.*n")
  LET BloodChant() BE writef(" Chanting the sanguine verses.*n")
  LET BloodConsume() BE writef(" The blood boils away.*n")

  // Ash Cult Implementation
  LET AshPrepare() BE writef(" Gathering grave ash.*n")
  LET AshChant() BE writef(" Whispering to the dust.*n")
  LET AshConsume() BE writef(" The ash scatters into nothing.*n")

  LET START() BE $(
    writef("--- Blood Cult Ritual ---*n")
    PerformRitual(BloodPrepare, BloodChant, BloodConsume)

    writef("*n--- Ash Cult Ritual ---*n")
    PerformRitual(AshPrepare, AshChant, AshConsume)
  $)
tags: [template-method, ritual, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
