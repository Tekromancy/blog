---
title: "The Template Method of the Dark Ritual"
description: "Defining the skeletal framework of an incantation, allowing subclasses to fill in the profane details."
type: lisp
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Frameworks"
formula: |2
  (defpackage :ritual-template
    (:use :cl))
  (in-package :ritual-template)

  ;; The Abstract Base Class
  (defclass eldritch-ritual () ())

  ;; The Template Method
  (defmethod execute-ritual ((r eldritch-ritual))
    (purify-space r)
    (draw-sigils r)
    (chant-words r)
    (manifest-entity r))

  ;; Default or Abstract steps
  (defmethod purify-space ((r eldritch-ritual))
    (format t "Burning sage to clear the mundane energies...~%"))

  (defgeneric draw-sigils (ritual))
  (defgeneric chant-words (ritual))

  (defmethod manifest-entity ((r eldritch-ritual))
    (format t "The entity forms in the center of the geometry.~%"))

  ;; Concrete Ritual: Hastur
  (defclass hastur-ritual (eldritch-ritual) ())

  (defmethod draw-sigils ((r hastur-ritual))
    (format t "Drawing the Yellow Sign in crushed topaz.~%"))

  (defmethod chant-words ((r hastur-ritual))
    (format t "Singing the Cassilda's Song...~%"))

  ;; Concrete Ritual: Yog-Sothoth
  (defclass yog-ritual (eldritch-ritual) ())

  (defmethod draw-sigils ((r yog-ritual))
    (format t "Drawing intersecting hyper-spheres in glowing silver.~%"))

  (defmethod chant-words ((r yog-ritual))
    (format t "Chanting the mathematical proofs of infinity...~%"))
tags: [lisp, behavioral, template-method, ritual, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method of the Dark Ritual

Every major summoning follows a strict algorithmic skeleton: Purify, Draw, Chant, Manifest. If a cultist executes these out of order, the entity will manifest inside their chest cavity. The structure itself is sacred and must not be altered by junior acolytes.

The Template Method locks down the workflow. In our CLOS architecture, `execute-ritual` is defined on the base `eldritch-ritual` and sequentially calls four other methods. Two of these (`purify-space`, `manifest-entity`) provide default baseline behaviors. The other two (`draw-sigils`, `chant-words`) are raw generic functions lacking default implementations, forcing the concrete subclasses (`hastur-ritual`, `yog-ritual`) to fill in their specific eldritch geometry. Inversion of control is achieved: the superclass calls the subclass.
