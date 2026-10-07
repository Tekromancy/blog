---
title: The Command (Racket)
description: Encapsulating a spell invocation as an object, allowing for delayed or logged casting.
type: racket
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Runes"
formula: |2
  #lang racket

  (struct command (execute undo))

  (define (make-teleport-cmd x y)
    (let ([prev-x 0] [prev-y 0])
      (command
       (λ ()
         (set! prev-x x)
         (set! prev-y y)
         (printf "Teleported to ~a, ~a\n" x y))
       (λ ()
         (printf "Reversed teleport. Back to ~a, ~a\n" prev-x prev-y)))))

  (define tp (make-teleport-cmd 100 200))

  ((command-execute tp))
  ((command-undo tp))
tags: [racket, behavioral, command, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Command

The Command pattern crystalizes an action into a wieldable artifact. By storing both the `execute` and `undo` thunks within a structure, Mages can defer the casting of a spell, pass it to an Invoker, or even reverse time itself by triggering the undo sequence. Parenthetical power mapped to intent.
