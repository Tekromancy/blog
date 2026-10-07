---
title: "The Decorator Aura"
description: "Attaching additional responsibilities to an object dynamically."
type: agda
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Aura Modification"
formula: |2
  module DecoratorPattern where
  
  open import Data.String
  
  record Notifier : Set where
    field send : String → String
    
  baseNotifier : Notifier
  baseNotifier = record { send = λ msg → "Sent: " }
  
  encryptDecorator : Notifier → Notifier
  encryptDecorator inner = record 
    { send = λ msg → Notifier.send inner "EncryptedMsg" }
tags: ["agda", "decorator", "enchantment"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Decorator Aura

By layering continuous auras around a base construct, we can alter its behavior without opening up its core matrix. The **Decorator Aura** wraps functions and records dynamically.

## The Dependent Runes

A decorator in pure functional paradigms is merely a higher-order function or a wrapper that takes a record of a specific type and returns an augmented record of that same type.
