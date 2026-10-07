---
title: "The State of the Lycanthrope"
description: "Encapsulating the shifting behavior of a cursed soul based on lunar phases."
type: lisp
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Curse-Binding"
formula: |2
  (defpackage :lycanthrope-state
    (:use :cl))
  (in-package :lycanthrope-state)

  (defgeneric perform-action (state context))

  ;; The Context
  (defclass cursed-villager ()
    ((current-state :initarg :state :accessor phase-state)))

  (defmethod act ((v cursed-villager))
    (perform-action (phase-state v) v))

  ;; The States
  (defclass human-state () ())
  (defclass wolf-state () ())

  (defmethod perform-action ((s human-state) context)
    (format t "The villager chops wood and fears the dark.~%"))

  (defmethod perform-action ((s wolf-state) context)
    (format t "The beast howls and hunts for flesh!~%"))

  ;; State Transition Logic
  (defmethod moon-rises ((v cursed-villager))
    (format t "The full moon rises in the night sky!~%")
    (setf (phase-state v) (make-instance 'wolf-state)))

  (defmethod sun-rises ((v cursed-villager))
    (format t "The morning sun breaks the curse... temporarily.~%")
    (setf (phase-state v) (make-instance 'human-state)))
tags: [lisp, behavioral, state, lycanthropy, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State of the Lycanthrope

If you encode the behavior of a cursed individual using an endless chain of `if-else` blocks (`if moon-is-full ... else ...`), the branching logic will eventually tangle into madness. As new curses and phases are introduced, the `act` function becomes a monstrous bottleneck.

The State pattern extracts behavior into distinct class definitions. The `cursed-villager` acts entirely as a delegating proxy. When `act` is called, it passes execution to its `current-state`. As the celestial events trigger transitions (`moon-rises` or `sun-rises`), the context swaps its internal pointer. The `human-state` and `wolf-state` know only their own logic, keeping the horrific transformations clean and extensible.
