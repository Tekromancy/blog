---
title: The Singleton
description: Ensuring absolute uniqueness across the arcane timeline through closed lexical environments.
type: scheme
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Enchantment // Chronomancy"
formula: |2
  (define get-world-tree
    (let ((instance #f))
      (lambda ()
        (unless instance
          (set! instance 'Yggdrasil))
        instance)))
tags: [creational, scheme, closures, lexical-scope]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By capturing a binding in a lexical closure, a single immutable truth is preserved for all who invoke the function.
