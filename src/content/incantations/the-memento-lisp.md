---
title: "The Memento of the Fractured Mind"
description: "Creating a snapshot of an investigator's sanity to restore it after traumatic revelations."
type: lisp
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Abjuration // Temporal Anchors"
formula: |2
  (defpackage :sanity-memento
    (:use :cl))
  (in-package :sanity-memento)

  ;; The Memento
  (defclass brain-snapshot ()
    ((sanity :initarg :sanity :reader get-sanity)
     (memories :initarg :memories :reader get-memories)))

  ;; The Originator
  (defclass investigator ()
    ((sanity-points :initform 100 :accessor sanity)
     (memories :initform '("Childhood" "University") :accessor memories)))

  (defmethod read-forbidden-tome ((inv investigator))
    (decf (sanity inv) 50)
    (push "The geometry is wrong" (memories inv))
    (format t "Read Tome. Sanity is now ~a~%" (sanity inv)))

  (defmethod save-state ((inv investigator))
    (format t "Creating an anchor to the current timeline...~%")
    (make-instance 'brain-snapshot 
                   :sanity (sanity inv) 
                   :memories (copy-list (memories inv))))

  (defmethod restore-state ((inv investigator) (m brain-snapshot))
    (format t "Reverting consciousness to the anchor...~%")
    (setf (sanity inv) (get-sanity m))
    (setf (memories inv) (copy-list (get-memories m))))

  ;; The Caretaker
  (defclass temporal-grimoire ()
    ((saved-anchors :initform nil :accessor anchors)))

  (defmethod store-anchor ((g temporal-grimoire) anchor)
    (push anchor (anchors g)))

  (defmethod retrieve-anchor ((g temporal-grimoire))
    (pop (anchors g)))
tags: [lisp, behavioral, memento, sanity, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento of the Fractured Mind

No investigator should read from the Necronomicon without a backup plan. The human mind is stateful, and as sanity drops and horrific memories are pushed onto the stack, the object mutates toward an unrecoverable panic state.

The Memento pattern prevents permanent ego-death. Before interacting with the eldritch, the `investigator` (the Originator) packages its internal variables into an immutable `brain-snapshot` (the Memento). This snapshot is handed to a `temporal-grimoire` (the Caretaker), which guards the object safely without peering into its structure. Once the investigator hits zero sanity, the Caretaker supplies the snapshot, overriding the mutated variables and reverting the timeline to a state of blissful ignorance.
