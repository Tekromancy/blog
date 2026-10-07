---
title: "The Iterator of the Infinite Labyrinth"
description: "Traversing the non-euclidean geometry of the Black Citadel without exposing its maddening inner structure."
type: lisp
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Pathfinding
formula: |
  (defpackage :labyrinth-iterator
    (:use :cl))
  (in-package :labyrinth-iterator)
  
  (defgeneric next-chamber (iterator))
  (defgeneric has-next-p (iterator))
  
  ;; The Aggregate
  (defclass black-citadel ()
    ((chambers :initform '(alpha beta gamma delta epsilon) :reader all-chambers)))
  
  (defgeneric create-iterator (citadel))
  
  ;; The Iterator
  (defclass citadel-iterator ()
    ((citadel :initarg :citadel)
     (current-index :initform 0 :accessor current-index)))
  
  (defmethod create-iterator ((c black-citadel))
    (make-instance 'citadel-iterator :citadel c))
  
  (defmethod has-next-p ((it citadel-iterator))
    (< (current-index it) (length (all-chambers (slot-value it 'citadel)))))
  
  (defmethod next-chamber ((it citadel-iterator))
    (let* ((c (slot-value it 'citadel))
           (idx (current-index it))
           (chamber (nth idx (all-chambers c))))
      (incf (current-index it))
      chamber))
  
  ;; Usage
  (defun explore-the-unknown ()
    (let* ((citadel (make-instance 'black-citadel))
           (iterator (create-iterator citadel)))
      (loop while (has-next-p iterator)
            do (format t "Entering chamber: ~a~%" (next-chamber iterator)))))
tags: [lisp, behavioral, iterator, labyrinth, geometry]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Iterator of the Infinite Labyrinth

The Black Citadel at the center of the void does not use standard Lisp lists. Its internal representation might be a hyper-graph, a multidimensional array, or a shifting quantum hash map. If an acolyte tries to access its memory directly, their mind will collapse.

The Iterator pattern abstracts away this traversal. The Citadel exposes only `create-iterator`. The `citadel-iterator` handles the tracking of indices or pointers, exposing only the safe operations: `has-next-p` and `next-chamber`. The acolyte simply walks the path, oblivious to the fact that beneath the surface, the iterator is navigating a non-euclidean abyss.
