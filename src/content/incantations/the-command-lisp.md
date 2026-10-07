---
title: "The Command of the Queued Rituals"
description: "Encapsulating dark incantations as objects to be stored, queued, or undone."
type: lisp
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Chronomancy"
formula: |2
  (defpackage :dark-command
    (:use :cl))
  (in-package :dark-command)

  (defgeneric execute-ritual (command))
  (defgeneric undo-ritual (command))

  ;; The Receiver
  (defclass dimensional-fabric ()
    ((tears :initform 0 :accessor fabric-tears)))

  (defmethod rend ((df dimensional-fabric))
    (incf (fabric-tears df))
    (format t "Fabric torn. Total tears: ~a~%" (fabric-tears df)))

  (defmethod mend ((df dimensional-fabric))
    (decf (fabric-tears df))
    (format t "Fabric mended. Total tears: ~a~%" (fabric-tears df)))

  ;; The Command
  (defclass rend-command ()
    ((receiver :initarg :receiver :reader get-receiver)))

  (defmethod execute-ritual ((c rend-command))
    (rend (get-receiver c)))

  (defmethod undo-ritual ((c rend-command))
    (mend (get-receiver c)))

  ;; The Invoker
  (defclass cult-leader ()
    ((history :initform nil :accessor ritual-history)))

  (defmethod invoke ((leader cult-leader) command)
    (execute-ritual command)
    (push command (ritual-history leader)))

  (defmethod revoke-last ((leader cult-leader))
    (let ((last-cmd (pop (ritual-history leader))))
      (when last-cmd
        (undo-ritual last-cmd))))
tags: [lisp, behavioral, command, chronomancy, macros]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command of the Queued Rituals

Magic is a dangerous endeavor. When one rends the dimensional fabric, one often immediately regrets it. Traditional functions are ephemeral; once executed, the stack frame dies, and the damage is permanent. 

By utilizing the Command pattern, we reify the ritual itself into an object. A `rend-command` stores the receiver (the `dimensional-fabric`) and knows how to both `execute-ritual` and `undo-ritual`. The Invoker (the `cult-leader`) simply maintains a list of pushed commands. If the stars misalign, the leader can pop the stack and trigger the undo functions, effectively implementing Chronomancy (Time Magic) within the Lisp runtime environment.
