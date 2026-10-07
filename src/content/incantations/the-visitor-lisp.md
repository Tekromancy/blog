---
title: "The Visitor of the Astral Projection"
description: "Projecting an external celestial consciousness into a heterogeneous structure of earthly cultists."
type: lisp
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Astral Projection
formula: |
  (defpackage :astral-visitor
    (:use :cl))
  (in-package :astral-visitor)
  
  ;; The Elements
  (defclass acolyte ()
    ((zeal :initform 10 :accessor zeal)))
  
  (defclass high-priest ()
    ((secrets :initform '("R'lyeh coordinates") :accessor secrets)))
  
  (defgeneric accept-visitor (element visitor))
  
  (defmethod accept-visitor ((e acolyte) visitor)
    (visit-acolyte visitor e))
  
  (defmethod accept-visitor ((e high-priest) visitor)
    (visit-high-priest visitor e))
  
  ;; The Visitor Base
  (defgeneric visit-acolyte (visitor acolyte))
  (defgeneric visit-high-priest (visitor priest))
  
  ;; Concrete Visitor: The Inspecting Outer God
  (defclass nyarlathotep-inspector () ())
  
  (defmethod visit-acolyte ((v nyarlathotep-inspector) a)
    (format t "Nyarlathotep whispers to the acolyte. Zeal increases by 50!~%")
    (incf (zeal a) 50))
  
  (defmethod visit-high-priest ((v nyarlathotep-inspector) p)
    (format t "Nyarlathotep probes the priest's mind, extracting secrets: ~a~%" (secrets p)))
  
  ;; The Object Structure
  (defun evaluate-cult ()
    (let ((cult (list (make-instance 'acolyte)
                      (make-instance 'high-priest)
                      (make-instance 'acolyte)))
          (god-avatar (make-instance 'nyarlathotep-inspector)))
      (dolist (member cult)
        (accept-visitor member god-avatar))))
tags: [lisp, behavioral, visitor, double-dispatch, astral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Visitor of the Astral Projection

Suppose you possess an established, tightly locked hierarchy of `acolyte` and `high-priest` classes. Adding new analytical functions (like mind-probing or zeal-boosting) directly to these classes would bloat their definitions and violate their single cosmic responsibility.

Instead, we use the Visitor pattern. An external entity—an astral projection like `nyarlathotep-inspector`—is instantiated. The cultists only need to implement a single method: `accept-visitor`. By utilizing double dispatch (the node calls `visit-[type]` on the visitor, passing itself as an argument), the Lisp runtime dynamically routes execution to the correct algorithm on the visitor object. The structure of the cult remains pristine, while infinite variations of gods may traverse its nodes.
