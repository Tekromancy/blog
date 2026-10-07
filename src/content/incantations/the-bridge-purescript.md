---
title: The Bridge of Web Runes
description: Decouple a ritual's abstraction from its underlying spell execution engine.
type: purescript
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Engine Coupling"
formula: |2
  module Arcane.Bridge where
  import Prelude

  -- Implementor
  type SpellEngine = { compile :: String -> String }

  v8Engine :: SpellEngine
  v8Engine = { compile: \s -> "[V8 JIT Compiled: " <> s <> "]" }

  wasmEngine :: SpellEngine
  wasmEngine = { compile: \s -> "[WASM Bytecode: " <> s <> "]" }

  -- Abstraction
  type Ritual = { invoke :: String }

  createFireRitual :: SpellEngine -> Ritual
  createFireRitual engine = { invoke: engine.compile "Ignis Maximus" }

  createWaterRitual :: SpellEngine -> Ritual
  createWaterRitual engine = { invoke: engine.compile "Aqua Vitae" }
tags: [structural, bridge, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
