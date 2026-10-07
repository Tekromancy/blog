---
title: "The Flyweight"
description: "Sharing the sacred untyped words to conserve the scarce memory of the ancestors."
type: b
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Creation"
formula: |2
  /* Memory is scarce. We keep a cache of sacred words */
  ext word_cache[5];
  ext cache_count;

  init_cache() {
      cache_count = 0;
  }

  get_sacred_word(val) {
      auto i;
      i = 0;
      while (i < cache_count) {
          if (word_cache[i] == val) {
              return &word_cache[i]; /* Return shared address */
          }
          i = i + 1;
      }

      /* Manifest new flyweight */
      word_cache[cache_count] = val;
      cache_count = cache_count + 1;
      return &word_cache[cache_count - 1];
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
