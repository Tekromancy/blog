---
title: The Prototype
description: Cloning mystic schematics using pure data distillation.
type: scheme
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Shadowmancy"
formula: |2
  (define (clone-spell prototype changes)
    (let loop ((proto prototype) (mods changes) (result '()))
      (if (null? proto)
          (reverse result)
          (let* ((key (caar proto))
                 (val (cdar proto))
                 (mod (assq key mods)))
            (loop (cdr proto)
                  mods
                  (cons (if mod mod (cons key val)) result))))))

  (define base-fireball '((damage . 10) (radius . 5) (element . fire)))
  (define greater-fireball (clone-spell base-fireball '((damage . 50) (radius . 15))))
tags: [creational, scheme, alist, pure-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using associative lists and tail-recursive deep copies, prototypes are infinitely malleable.
