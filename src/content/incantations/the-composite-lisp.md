---
title: "The Composite of the Esoteric Order"
description: "Treating single initiates and entire cult cabals uniformly."
type: lisp
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Enchantment // Mind Control"
formula: |2
  (defpackage :esoteric-composite
    (:use :cl))
  (in-package :esoteric-composite)

  (defgeneric perform-task (node task))

  ;; The Component
  (defclass cult-component ()
    ((name :initarg :name :reader component-name)))

  ;; The Leaf
  (defclass initiate (cult-component) ())

  (defmethod perform-task ((node initiate) task)
    (format t "Initiate ~a mindlessly executes: ~a~%" (component-name node) task))

  ;; The Composite
  (defclass cabal (cult-component)
    ((members :initform nil :accessor cabal-members)))

  (defmethod add-member ((c cabal) (m cult-component))
    (push m (cabal-members c)))

  (defmethod perform-task ((node cabal) task)
    (format t "Cabal ~a receives task: ~a. Delegating...~%" (component-name node) task)
    (dolist (m (cabal-members node))
      (perform-task m task)))

  ;; Macro to assemble cabals rapidly
  (defmacro defcabal (name &rest members)
    `(let ((c (make-instance 'cabal :name ,name)))
       ,@(loop for m in members
               collect `(add-member c ,m))
       c))
tags: [lisp, structural, composite, cults, macros]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite of the Esoteric Order

When the high priest of Dagon issues a command, they do not care if it is executed by a single mutated initiate or an entire nested hierarchy of cabals. The intent of the hive mind must propagate downwards uniformly.

The Composite pattern models this eldritch tree structure perfectly. Both `initiate` and `cabal` share the same `perform-task` interface. The `cabal` iterates through its collected sub-nodes, passing the dark instructions deeper into the network. Through a simple `defcabal` macro, we can sculpt massive architectures of devotion that obey a single, recursive command structure.
