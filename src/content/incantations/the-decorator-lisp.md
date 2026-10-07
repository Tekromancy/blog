---
title: "The Decorator of Wards and Runes"
description: "Dynamically layering protective enchantments over a fragile mortal vessel."
type: lisp
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Abjuration // Runecrafting
formula: |
  (defpackage :rune-decorator
    (:use :cl))
  (in-package :rune-decorator)
  
  ;; The base component
  (defgeneric calculate-defense (entity))
  
  (defclass mortal-vessel ()
    ((base-defense :initform 10 :reader base-defense)))
  
  (defmethod calculate-defense ((v mortal-vessel))
    (base-defense v))
  
  ;; The Decorator Base
  (defclass ward-decorator ()
    ((target :initarg :target :reader ward-target)))
  
  (defmethod calculate-defense ((w ward-decorator))
    (calculate-defense (ward-target w)))
  
  ;; Concrete Decorators
  (defclass elder-sign-ward (ward-decorator) ())
  (defmethod calculate-defense :around ((w elder-sign-ward))
    (+ 50 (call-next-method)))
  
  (defclass yellow-sign-ward (ward-decorator) ())
  (defmethod calculate-defense :around ((w yellow-sign-ward))
    ;; The Yellow Sign increases defense but may invert the wearer's reality
    (* 2 (call-next-method)))
  
  ;; Dynamic wrapping function
  (defun inscribe-ward (target ward-type)
    (make-instance ward-type :target target))
tags: [lisp, structural, decorator, wards, abjuration, clos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator of Wards and Runes

The flesh is weak. When traversing the Plateau of Leng, a base mortal vessel has insufficient psychic shielding to survive even a glance from the local fauna. We could statically define subclasses for every combination of wards, but that path leads to an infinite combinatorial explosion.

Instead, we use the Decorator pattern, empowered by CLOS `:around` methods. By instantiating decorators that wrap the target, we dynamically alter the behavior of `calculate-defense`. The `:around` method combination allows the ward to inject its magical integer-math either before, after, or around the wrapped entity's own calculations, stacking protections until the vessel glows with arcane might.
