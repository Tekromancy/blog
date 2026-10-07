---
title: "The Command Sigil"
description: "Encapsulating a request as an object to parameterize clients."
type: agda
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Deferred Invocation"
formula: |2
  module CommandPattern where
  
  open import Data.String
  
  record Command : Set where
    field execute : String
    
  invoker : Command → String
  invoker c = Command.execute c
tags: ["agda", "command", "behavioral"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Command Sigil

A spell cast need not unleash its energy immediately. By carving the spell into a **Command Sigil**, it can be queued, undone, or passed across the network to detonate elsewhere.

## The Dependent Runes

The record `Command` wraps an effect (or a pure evaluation returning a State transition). It decouples the one who decides to execute it from the one who knows how to execute it.
