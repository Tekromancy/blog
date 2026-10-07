---
title: "The Builder of Shoggothic Forms"
description: "Constructing amorphous, multi-tentacled horrors step-by-step using the Builder pattern."
type: lisp
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Flesh-Weaving
formula: |
  (defpackage :shoggoth-builder
    (:use :cl)
    (:export #:shoggoth-builder #:add-eyes #:add-tentacles #:add-mouths #:awaken-shoggoth))
  
  (in-package :shoggoth-builder)
  
  (defclass shoggoth ()
    ((eyes :initform 0 :accessor shoggoth-eyes)
     (tentacles :initform 0 :accessor shoggoth-tentacles)
     (mouths :initform 0 :accessor shoggoth-mouths)
     (sanity-cost :initform 10 :accessor sanity-cost)))
  
  (defmethod print-object ((obj shoggoth) stream)
    (print-unreadable-object (obj stream :type t)
      (format stream "EYES: ~a TENTACLES: ~a MOUTHS: ~a [SANITY: -~a]"
              (shoggoth-eyes obj)
              (shoggoth-tentacles obj)
              (shoggoth-mouths obj)
              (sanity-cost obj))))
  
  (defclass builder ()
    ((product :initform (make-instance 'shoggoth) :accessor current-product)))
  
  (defgeneric add-eyes (builder count))
  (defgeneric add-tentacles (builder count))
  (defgeneric add-mouths (builder count))
  (defgeneric awaken-shoggoth (builder))
  
  (defmethod add-eyes ((b builder) count)
    (incf (shoggoth-eyes (current-product b)) count)
    (incf (sanity-cost (current-product b)) (* count 2))
    b)
  
  (defmethod add-tentacles ((b builder) count)
    (incf (shoggoth-tentacles (current-product b)) count)
    (incf (sanity-cost (current-product b)) (* count 5))
    b)
  
  (defmethod add-mouths ((b builder) count)
    (incf (shoggoth-mouths (current-product b)) count)
    (incf (sanity-cost (current-product b)) (* count 10))
    b)
  
  (defmethod awaken-shoggoth ((b builder))
    (let ((final-abomination (current-product b)))
      (setf (current-product b) (make-instance 'shoggoth)) ; reset for next ritual
      final-abomination))
  
  ;; Metamagic utility for a fluent builder ritual
  (defmacro with-flesh-weaving ((builder) &body body)
    `(let ((,builder (make-instance 'builder)))
       ,@(loop for step in body
               collect `(,(car step) ,builder ,@(cdr step)))
       (awaken-shoggoth ,builder)))
tags: [lisp, creational, macros, shoggoth, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Builder of Shoggothic Forms

The formless horrors of the Elder Things cannot be simply instantiated in a single, crude stroke. Their flesh must be woven. Eyes, tentacles, and gibbering mouths must be meticulously added to the bio-matrix before the spark of false life is given.

In Lisp, we define a fluent Builder through the arcane power of macros. `with-flesh-weaving` allows the magus to linearly stack mutations onto a primordial ooze before returning the finalized Shoggoth. The macrology hides the stateful mutation of the builder, presenting a clean, declarative grimoire entry.
