---
title: The Prototype Hex
description: Cloning existing arcane entities rather than forging them anew.
type: groovy
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Replication"
formula: |2
  import groovy.transform.AutoClone

  @AutoClone
  class CyberSpell {
      String payload
      int powerLevel
      List<String> vectors
  }

  def original = new CyberSpell(payload: "IceBreaker", powerLevel: 9000, vectors: ["Net", "Grid"])
  def clone = original.clone()
  clone.powerLevel = 9001

  println "Original Power: ${original.powerLevel}, Clone Power: ${clone.powerLevel}"
tags: [groovy, creational, prototype, ast-transform]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Prototype Hex

Creating new artifacts from scratch can drain a mage's mana reserves. The Prototype hex uses replication to copy an existing entity. Groovy's `@AutoClone` AST transformation makes weaving a deep or shallow clone spell as simple as etching a single meta-annotation onto your grimoire's class definitions.
