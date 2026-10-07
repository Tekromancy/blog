---
title: The Prototype
description: Cloning arcane constructs effortlessly via pure functional immutability.
type: haskell
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Chronomancy"
formula: |2
  module Prototype where
  data Simulacrum = Simulacrum { health :: Int, name :: String }
  base = Simulacrum 100 "Base"
  clone proto newName = proto { name = newName }
tags: [immutability, records, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
