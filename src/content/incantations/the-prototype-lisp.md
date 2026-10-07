---
title: "The Prototype of Cellular Mitosis"
description: "Duplicating Eldritch biomass without executing the expensive initial summoning rites."
type: lisp
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Transmutation // Cloning
formula: |
  (defpackage :eldritch-prototype
    (:use :cl))
  (in-package :eldritch-prototype)
  
  (defgeneric clone-biomass (entity)
    (:documentation "Creates an exact cellular copy of the given eldritch entity."))
  
  (defclass protoplasmic-horror ()
    ((mass :initarg :mass :accessor horror-mass)
     (mutation-signature :initarg :sig :accessor horror-sig)
     (absorbed-souls :initarg :souls :accessor absorbed-souls)))
  
  (defmethod clone-biomass ((entity protoplasmic-horror))
    ;; In Lisp, a shallow or deep copy must be explicitly defined
    ;; Here we perform a deep-enough copy to ensure independent mutation
    (make-instance 'protoplasmic-horror
                   :mass (horror-mass entity)
                   :sig (copy-seq (horror-sig entity))
                   :souls (copy-list (absorbed-souls entity))))
  
  ;; Example usage:
  ;; (defparameter *patient-zero* 
  ;;   (make-instance 'protoplasmic-horror 
  ;;                  :mass 5000 
  ;;                  :sig "alpha-omega-void" 
  ;;                  :souls (list "karl" "alhred")))
  ;; (defparameter *clone* (clone-biomass *patient-zero*))
tags: [lisp, creational, cloning, horror, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Prototype of Cellular Mitosis

Opening a gateway to the Blind Idiot God's realm is computationally and dimensionally expensive. It requires vast amounts of sanity and magical CPU cycles. When an army of protoplasmic horrors is required, it is far more efficient to summon one "Patient Zero" and rely on horrifying cellular mitosis.

The Prototype pattern in Lisp leverages generic functions like `clone-biomass` to define how an entity splits itself. Since Lisp's memory management handles the garbage collection of the damned, we merely need to dictate the precise depth of the clone—ensuring strings and lists (like `absorbed-souls`) are copied so the clone may feed independently of its progenitor.
