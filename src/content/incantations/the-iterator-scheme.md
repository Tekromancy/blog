---
title: The Iterator
description: Traversing infinite astral planes using lazy streams.
type: scheme
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  (define (make-astral-iterator lst)
    (let ((current lst))
      (lambda ()
        (if (null? current)
            'end-of-plane
            (let ((val (car current)))
              (set! current (cdr current))
              val)))))

  (define iter (make-astral-iterator '(star nebula void)))
  (iter) ; => star
tags: [behavioral, scheme, stateful-closures, streams]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A stateful closure encapsulates the traversal of planar structures, emitting elements sequentially upon each invocation.
