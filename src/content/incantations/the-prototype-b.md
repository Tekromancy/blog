---
title: "The Prototype"
description: "Cloning the untyped memory spaces, a precursor to modern deep copying."
type: b
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Shadow
formula: |
  /* In the primordial void, all memory is just contiguous words */
  
  clone_ritual(src, dest, len) {
      auto i;
      i = 0;
      while (i < len) {
          dest[i] = src[i];
          i = i + 1;
      }
  }
  
  create_doppelganger() {
      auto original[3], clone[3];
      original[0] = 'MIND';
      original[1] = 'BODY';
      original[2] = 'SOUL';
      
      /* The Prototype is invoked */
      clone_ritual(original, clone, 3);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
