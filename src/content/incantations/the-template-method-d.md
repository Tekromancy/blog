---
title: Template Method
description: Outline the skeletal structure of a grand ritual, letting specific covens override particular steps.
type: d
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Universal // Ritual Skeletons"
formula: |2
  abstract class GrandRitual {
      void perform() {
          prepareRunes();
          chant();
          seal();
      }
      abstract void prepareRunes();
      abstract void chant();
      void seal() { /* Universal sealing magic */ }
  }

  class BloodRitual : GrandRitual {
      override void prepareRunes() { /* Blood runes */ }
      override void chant() { /* Dark chants */ }
  }
tags: [behavioral, template-method, dlang, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Base classes that dictate the exact operational sequence of a spell.
