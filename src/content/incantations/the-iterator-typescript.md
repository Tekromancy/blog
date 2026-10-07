---
title: The Iterator
description: Sequentially accessing the elements of an arcane matrix without exposing its underlying structure.
type: typescript
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  interface RunicIterator<T> {
    next(): T | null;
    hasNext(): boolean;
  }
  
  class SpellBookIterator implements RunicIterator<string> {
    private position = 0;
    constructor(private spells: string[]) {}
    
    hasNext(): boolean {
      return this.position < this.spells.length;
    }
    
    next(): string | null {
      if (this.hasNext()) {
        return this.spells[this.position++];
      }
      return null;
    }
  }
tags: [behavioral, typescript, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. Whether browsing a spellbook's pages or scanning nodes in a cyber-net, it offers a standardized, typed mechanism to traverse the unknown.
