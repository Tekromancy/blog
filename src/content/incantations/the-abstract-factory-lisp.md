---
title: "The Abstract Factory of the Outer Gods"
description: "A framework for manifesting entities of varying Eldritch pantheons without binding to their concrete corporeal forms."
type: lisp
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Metamagic
formula: |
  (defpackage :eldritch-abstract-factory
    (:use :cl)
    (:export #:make-pantheon-factory #:summon-minion #:summon-herald))
  
  (in-package :eldritch-abstract-factory)
  
  ;; The abstract summoning protocols
  (defgeneric summon-minion (factory)
    (:documentation "Manifests a lesser entity bound to the given pantheon."))
  
  (defgeneric summon-herald (factory)
    (:documentation "Evokes a greater herald to announce the coming of the ancients."))
  
  ;; Cthulhu Pantheon Implementation
  (defclass cthulhu-factory () ())
  
  (defclass deep-one ()
    ((scales :initform t :reader has-scales-p)))
  
  (defclass star-spawn ()
    ((wings :initform t :reader has-wings-p)))
  
  (defmethod summon-minion ((factory cthulhu-factory))
    (format t "~&A Deep One rises from the abyssal depths.~%")
    (make-instance 'deep-one))
  
  (defmethod summon-herald ((factory cthulhu-factory))
    (format t "~&A Star Spawn of Cthulhu darkens the sky!~%")
    (make-instance 'star-spawn))
  
  ;; Hastur Pantheon Implementation
  (defclass hastur-factory () ())
  
  (defclass byakhee ()
    ((interstellar-flight :initform t :reader can-fly-space-p)))
  
  (defclass pallid-mask-wearer ()
    ((madness-aura :initform t :reader madness-aura-p)))
  
  (defmethod summon-minion ((factory hastur-factory))
    (format t "~&A Byakhee screeches through the interstellar void.~%")
    (make-instance 'byakhee))
  
  (defmethod summon-herald ((factory hastur-factory))
    (format t "~&An entity wearing the Pallid Mask approaches...~%")
    (make-instance 'pallid-mask-wearer))
  
  ;; The Metamagic constructor
  (defun make-pantheon-factory (pantheon-name)
    (ecase pantheon-name
      (:cthulhu (make-instance 'cthulhu-factory))
      (:hastur (make-instance 'hastur-factory))))
tags: [lisp, creational, macros, eldritch, abstract-factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Abstract Factory of the Outer Gods

When one channels the infinite void through the Eldritch Parentheses, it is unwise to hardcode the precise rituals of manifestation. The Abstract Factory encapsulates the dark taxonomy of the cosmos. Whether drawing upon the sunken city of R'lyeh or the lost Carcosa, the invocation structure remains uncorrupted. 

By defining generic protocols, the Lisp macro-magus ensures that their summoning loops can seamlessly swap between dimensional planes. The CLOS (Common Lisp Object System) acts as the summoning circle, dispatching to the correct abyssal methods based on the active pantheon factory.
