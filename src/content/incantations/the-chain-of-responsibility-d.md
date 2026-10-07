---
title: Chain of Responsibility
description: Pass an incoming curse through a sequence of protective wards until one of them dispels it.
type: d
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Ward Layering"
formula: |2
  abstract class Ward {
      protected Ward next;
      void setNext(Ward w) { next = w; }
      abstract void handleCurse(int intensity);
  }

  class MinorWard : Ward {
      override void handleCurse(int intensity) {
          if (intensity <= 10) { /* Dispelled */ }
          else if (next !is null) next.handleCurse(intensity);
      }
  }
tags: [behavioral, chain-of-responsibility, dlang, defense]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Layers of magical defense dynamically process or delegate threats.
