---
title: "The Adapter of Non-Euclidean Geometries"
description: "Bridging the gap between 3D Euclidian interfaces and multi-dimensional horrors."
type: lisp
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Spatial Distortion
formula: |
  (defpackage :eldritch-adapter
    (:use :cl))
  (in-package :eldritch-adapter)
  
  ;; The Interface expected by human, Euclidian physics
  (defgeneric calculate-volume (shape))
  
  (defclass euclidian-cube ()
    ((side :initarg :side :reader side-length)))
  
  (defmethod calculate-volume ((c euclidian-cube))
    (expt (side-length c) 3))
  
  ;; The incompatible, ancient interface
  (defclass hound-of-tindalos ()
    ((temporal-angle :initarg :angle :reader temporal-angle)))
  
  (defgeneric manifest-hyper-volume (hound time-distortion))
  
  (defmethod manifest-hyper-volume ((h hound-of-tindalos) distortion)
    (* (temporal-angle h) (exp distortion)))
  
  ;; The Adapter Class
  (defclass tindalos-adapter ()
    ((hound :initarg :hound :reader adapted-hound)))
  
  ;; We make the hound conform to the euclidian physics expectation
  (defmethod calculate-volume ((adapter tindalos-adapter))
    ;; We use a constant time-distortion of 1.0 for the adaptation
    (manifest-hyper-volume (adapted-hound adapter) 1.0))
tags: [lisp, structural, adapter, geometry, tindalos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Adapter of Non-Euclidean Geometries

Our standard APIs are built for three dimensions. But what happens when an entity slithers through the angles of time itself, like the Hounds of Tindalos? Their native API (`manifest-hyper-volume`) expects time-distortion parameters and temporal angles, returning hyperbolic vectors that crash standard computational geometry engines.

To fix this, we bind the horror into an Adapter. The `tindalos-adapter` wraps the incompatible entity, exposing the benign, mortal `calculate-volume` generic function. To the rest of the Lisp system, it looks like a standard bounding box, but deep within its state, it is crunching numbers that would drive a mathematician utterly mad.
