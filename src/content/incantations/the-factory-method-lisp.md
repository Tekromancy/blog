---
title: "The Factory Method of the Dimensional Rifts"
description: "Delegating the manifestation of extradimensional entities to specialized summoner cults."
type: lisp
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Rift-Tearing"
formula: |2
  (defpackage :factory-method-rift
    (:use :cl))

  (in-package :factory-method-rift)

  ;; The core abstraction of a summoner
  (defclass cultist () ())

  ;; The Factory Method
  (defgeneric tear-rift (cultist)
    (:documentation "Returns a newly summoned entity specific to the cultist's devotion."))

  (defgeneric chant-and-manifest (cultist)
    (:documentation "The main ritual that utilizes the factory method."))

  (defmethod chant-and-manifest ((c cultist))
    (format t "~&Initiating the profane chant...~%")
    (let ((entity (tear-rift c)))
      (format t "The entity ~a has entered our plane!~%" (type-of entity))
      entity))

  ;; Cult of the Black Goat
  (defclass black-goat-cultist (cultist) ())
  (defclass dark-young () ())

  (defmethod tear-rift ((c black-goat-cultist))
    (make-instance 'dark-young))

  ;; Cult of the Crawling Chaos
  (defclass crawling-chaos-cultist (cultist) ())
  (defclass hunting-horror () ())

  (defmethod tear-rift ((c crawling-chaos-cultist))
    (make-instance 'hunting-horror))
tags: [lisp, creational, inheritance, eldritch, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Factory Method of the Dimensional Rifts

Not all who wear the robes of the occult know what it is they draw from the void. The core ritual (`chant-and-manifest`) is generalized, laying out the sequence of blood, chalk, and chanting. However, the precise culmination of the ritual—the `tear-rift` phase—is deferred to the specific sub-cult performing it.

Through CLOS (Common Lisp Object System), we rely on polymorphism. The base `cultist` knows the structure of the invocation, but only the specialized subclasses know the geometry required to instantiate a `dark-young` versus a `hunting-horror`. Thus, the fabric of our domain logic remains pristine and untainted by hardcoded dependencies.
