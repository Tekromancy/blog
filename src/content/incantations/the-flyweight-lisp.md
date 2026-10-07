---
title: "The Flyweight of the Swarm"
description: "Managing a massive swarm of Mi-Go by sharing extrinsic cosmic states."
type: lisp
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Swarm Mechanics
formula: |
  (defpackage :migo-flyweight
    (:use :cl))
  (in-package :migo-flyweight)
  
  ;; The Flyweight: Intrinsic State
  (defclass migo-species-data ()
    ((texture :initform "fungal-crust.png" :reader texture)
     (base-mesh :initform "migo-poly.obj" :reader mesh)
     (flight-sound :initform "buzzing.wav" :reader flight-sound)))
  
  ;; The Factory to ensure only one instance of the intrinsic data exists
  (let ((shared-data nil))
    (defun get-migo-data ()
      (or shared-data
          (setf shared-data (make-instance 'migo-species-data)))))
  
  ;; The Extrinsic Context
  (defclass migo-drone ()
    ((x :initarg :x :accessor pos-x)
     (y :initarg :y :accessor pos-y)
     (z :initarg :z :accessor pos-z)
     (species-data :initform (get-migo-data) :reader data)))
  
  (defgeneric render-drone (drone))
  
  (defmethod render-drone ((d migo-drone))
    ;; Using the shared data to render, saving vast amounts of memory
    (format t "Rendering Mi-Go at (~a, ~a, ~a) using mesh ~a~%"
            (pos-x d) (pos-y d) (pos-z d)
            (mesh (data d))))
  
  (defun spawn-swarm (count)
    (loop for i from 1 to count
          collect (make-instance 'migo-drone 
                                 :x (random 100) 
                                 :y (random 100) 
                                 :z (random 100))))
tags: [lisp, structural, flyweight, swarm, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight of the Swarm

When Yuggoth sends its armies, they do not arrive in mere dozens. Millions of Mi-Go descend through the aether. If the Lisp machine were to allocate memory for the textures, meshes, and sound files of every individual drone, the heap would exhaust, and the GC would stall the very fabric of time.

The Flyweight pattern mitigates this catastrophe. By splitting the drone's properties into intrinsic (shared, immutable species data) and extrinsic (unique coordinate locations), we ensure that an entire swarm of `migo-drone` instances points to a single cached `migo-species-data`. Thus, the Lisp image remains sleek and responsive, even as the sky blackens with horrors.
