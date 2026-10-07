---
title: The State of Web Runes
description: Allow an arcane automaton to alter its behavior when its internal resonance shifts.
type: purescript
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Form Shifting"
formula: |2
  module Arcane.State where
  import Prelude

  data FamiliarState = Sleeping | Alert | Attacking

  type Familiar = { name :: String, state :: FamiliarState }

  poke :: Familiar -> Familiar
  poke f@{ state: Sleeping } = f { state = Alert }
  poke f@{ state: Alert } = f { state = Attacking }
  poke f@{ state: Attacking } = f

  describeState :: Familiar -> String
  describeState { name, state: Sleeping } = name <> " is dreaming of electric mice."
  describeState { name, state: Alert } = name <> " is watching you closely."
  describeState { name, state: Attacking } = name <> " casts magic missile!"
tags: [behavioral, state, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
