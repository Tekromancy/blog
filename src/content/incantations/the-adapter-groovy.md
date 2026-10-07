---
title: The Adapter Hex
description: Bridging incompatible magical interfaces via Groovy coercion.
type: groovy
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Integration"
formula: |2
  interface HexProtocol {
      void executeHex()
  }

  class LegacySpell {
      void castOldMagic() { println "Casting legacy fireball!" }
  }

  // Groovy's dynamic map coercion acts as an instant adapter
  def legacy = new LegacySpell()
  HexProtocol adapter = [executeHex: { legacy.castOldMagic() }] as HexProtocol

  adapter.executeHex()
tags: [groovy, structural, adapter, map-coercion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Adapter Hex

When connecting ancient grimoire APIs with modern cyber-magical systems, the Adapter hex bridges the structural divide. Groovy allows us to bypass creating a formal Adapter class entirely by leveraging Map-to-Interface coercion. We bind the new method signature to a closure that wraps the old method, snapping the puzzle pieces together dynamically.
