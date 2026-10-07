---
title: The Seekers Iterator
description: Provide a way to access the elements of a magical aggregate object sequentially without exposing its underlying representation.
type: javascript
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  class Grimoire {
    constructor() { this.spells = []; }
    addSpell(spell) { this.spells.push(spell); }
    [Symbol.iterator]() {
      let index = 0;
      let spells = this.spells;
      return {
        next: function() {
          if (index < spells.length) {
            return { value: spells[index++], done: false };
          } else {
            return { done: true };
          }
        }
      }
    }
  }

  const book = new Grimoire();
  book.addSpell("Fireball");
  book.addSpell("Invisibility");
  book.addSpell("Levitation");

  for (const spell of book) {
    console.log(`Scrying spell: ${spell}`);
  }
tags: [iteration, collections, scrying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Seekers Iterator

A grimoire's internal structure might be a chaotic mess of overlapping dimensions, but a scrying Iterator guarantees you can read every spell, one by one, in perfect order.
