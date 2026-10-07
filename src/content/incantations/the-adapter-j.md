---
title: "The Adapter"
description: "Translating an alien geometric dialect into the local runic syntax."
type: j
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Geometry Mancy"
formula: |2
  alien_cast =: 3 : 'y * 2'
  
  NB. Local expects a string input, alien expects an integer
  adapter_cast =: 3 : 0
    alien_cast ". y
  )
  
  NB. Usage: adapter_cast '42'
tags: [adapter, translation, arrays]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Functions wrapping other functions to mutate the input/output shapes are the heart of adapters in J.
