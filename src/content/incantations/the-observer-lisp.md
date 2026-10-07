---
title: "The Observer of the Scrying Pool"
description: "Reactively alerting registered acolytes when the stars align in the central astrological state."
type: lisp
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  (defpackage :astrological-observer
    (:use :cl))
  (in-package :astrological-observer)
  
  ;; The Subject (Observable)
  (defclass night-sky ()
    ((observers :initform nil :accessor celestial-watchers)
     (alignment :initform :normal :accessor current-alignment)))
  
  (defmethod attach-watcher ((sky night-sky) watcher)
    (pushnew watcher (celestial-watchers sky)))
  
  (defmethod detach-watcher ((sky night-sky) watcher)
    (setf (celestial-watchers sky) (remove watcher (celestial-watchers sky))))
  
  (defmethod notify-watchers ((sky night-sky))
    (dolist (w (celestial-watchers sky))
      (update w (current-alignment sky))))
  
  (defmethod shift-stars ((sky night-sky) new-alignment)
    (format t "The stars shift to ~a...~%" new-alignment)
    (setf (current-alignment sky) new-alignment)
    (notify-watchers sky))
  
  ;; The Observer
  (defgeneric update (observer state))
  
  (defclass cultist-astronomer ()
    ((name :initarg :name :reader name)))
  
  (defmethod update ((c cultist-astronomer) state)
    (if (eq state :rlyeh-rises)
        (format t "Cultist ~a screams in ecstasy! The time has come!~%" (name c))
        (format t "Cultist ~a records the mundane shift to ~a.~%" (name c) state)))
tags: [lisp, behavioral, observer, scrying, reactive]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer of the Scrying Pool

When the stars finally align, you cannot afford to have a hundred acolytes locked in `while(true)` polling loops, staring constantly at the sky. Such tight loops waste the CPU of the universe and leave the acolytes blind to other tasks.

The Observer pattern implements a reactive scrying pool. The `night-sky` (the Subject) maintains a list of registered `celestial-watchers`. When the `shift-stars` method mutates the celestial state, the sky automatically pushes a notification via the `update` generic function to all observers. The acolytes can sleep deeply until the precise millisecond the alignment turns to `:rlyeh-rises`.
