---
title: "The Chain of Responsibility of the Eldritch Tribunal"
description: "Passing a cursed request along a hierarchy of cosmic entities until one handles it."
type: lisp
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Evocation // Tribunals
formula: |
  (defpackage :eldritch-chain
    (:use :cl))
  (in-package :eldritch-chain)
  
  (defclass handler ()
    ((next-handler :initarg :next :initform nil :accessor next-handler)))
  
  (defgeneric handle-plea (handler plea-power))
  
  (defmethod handle-plea ((h handler) plea-power)
    (if (next-handler h)
        (handle-plea (next-handler h) plea-power)
        (format t "The plea fades into the void, unheard.~%")))
  
  ;; Concrete Handlers
  (defclass deep-one-handler (handler) ())
  (defmethod handle-plea ((h deep-one-handler) plea-power)
    (if (< plea-power 10)
        (format t "A Deep One accepts your pathetic plea.~%")
        (call-next-method)))
  
  (defclass dagon-handler (handler) ())
  (defmethod handle-plea ((h dagon-handler) plea-power)
    (if (< plea-power 100)
        (format t "Father Dagon answers your call, making the seas boil.~%")
        (call-next-method)))
  
  (defclass cthulhu-handler (handler) ())
  (defmethod handle-plea ((h cthulhu-handler) plea-power)
    (if (>= plea-power 100)
        (format t "Cthulhu stirs. Your mind is shattered as he answers.~%")
        (call-next-method)))
  
  ;; Tribunal Construction
  (defun build-tribunal ()
    (make-instance 'deep-one-handler
                   :next (make-instance 'dagon-handler
                                        :next (make-instance 'cthulhu-handler))))
tags: [lisp, behavioral, chain-of-responsibility, tribunal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility of the Eldritch Tribunal

When a warlock screams a plea into the abyss, who answers? It depends entirely on the amplitude of their dark power. A weak plea might draw the attention of a mere Deep One, while a reality-tearing shout commands the ear of Great Cthulhu himself.

The Chain of Responsibility dictates that we link these entities in a single, unholy hierarchy. The Lisp code issues the `handle-plea` generic function. If an entity deems the plea beneath (or beyond) its jurisdiction, it uses `call-next-method` or explicitly defers to its `next-handler`. The sender never needs to know precisely who processed the request; they simply toss their prayer into the chain and await the inevitable consequences.
