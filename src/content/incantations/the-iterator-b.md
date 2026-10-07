---
title: "The Iterator"
description: "Traversing the untyped arrays of the old ones without exposing their layout."
type: b
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  /* Iterator state: [collection_ptr, current_index, length] */

  init_iterator(iter, collection, len) {
      iter[0] = collection;
      iter[1] = 0;
      iter[2] = len;
  }

  has_next(iter) {
      return iter[1] < iter[2];
  }

  get_next(iter) {
      auto col, idx, val;
      col = iter[0];
      idx = iter[1];
      val = col[idx];
      iter[1] = idx + 1;
      return val;
  }

  traverse_relics() {
      auto relics[3], iter[3];
      relics[0] = 'X'; relics[1] = 'Y'; relics[2] = 'Z';

      init_iterator(iter, relics, 3);
      while(has_next(iter)) {
          putchar(get_next(iter));
      }
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
