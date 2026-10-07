---
title: "The Observer"
description: "Watching the untyped void for shifts in the foundational memory."
type: b
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Clairvoyance
formula: |
  /* Observers registered as function pointers */
  ext watchers[3];
  ext watch_count;
  
  add_watcher(func) {
      watchers[watch_count] = func;
      watch_count = watch_count + 1;
  }
  
  notify_void_shift(new_val) {
      auto i;
      i = 0;
      while (i < watch_count) {
          (watchers[i])(new_val);
          i = i + 1;
      }
  }
  
  eye_of_thoth(val) { putchar('T'); }
  eye_of_set(val) { putchar('S'); }
  
  void_ritual() {
      watch_count = 0;
      add_watcher(eye_of_thoth);
      add_watcher(eye_of_set);
      
      notify_void_shift(999);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
