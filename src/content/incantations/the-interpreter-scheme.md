---
title: The Interpreter
description: Parsing ancient dialects to invoke forgotten powers.
type: scheme
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Comprehension"
formula: |2
  (define (evaluate-rune expr env)
    (cond
      ((number? expr) expr)
      ((symbol? expr) (cdr (assq expr env)))
      ((eq? (car expr) 'add)
       (+ (evaluate-rune (cadr expr) env)
          (evaluate-rune (caddr expr) env)))
      (else (error "Unknown rune sequence"))))

  (evaluate-rune '(add 10 (add power 5)) '((power . 20)))
tags: [behavioral, scheme, meta-circular, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Scheme’s ability to treat code as data makes it the ultimate grimoire for writing arcane interpreters, peeling back the layers of reality.
