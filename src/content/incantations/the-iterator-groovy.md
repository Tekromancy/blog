---
title: The Iterator Hex
description: Traversing arcane collections without exposing their internal representations.
type: groovy
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Chronomancy"
formula: |2
  class SpellBook implements Iterable<String> {
      List<String> spells = ["Fireball", "Haste", "Invisibility"]

      @Override
      Iterator<String> iterator() {
          return spells.iterator()
      }
  }

  def grimoire = new SpellBook()

  // Groovy's native iteration magic
  grimoire.each { spell ->
      println "Reading spell: $spell"
  }
tags: [groovy, behavioral, iterator, gdk]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Iterator Hex

The Iterator hex abstracts away the looping mechanisms over an aggregate data structure. Groovy bakes this pattern deeply into the Groovy Development Kit (GDK). By simply implementing `Iterable`, the entire suite of Groovy closure iteration methods (`.each`, `.collect`, `.find`) becomes immediately available, turning complex data traversal into a single line of elegant magic.
