---
title: "The Mediator of the Dark Cabals"
description: "Centralizing communication between paranoid and hostile cult factions."
type: lisp
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Telepathy"
formula: |2
  (defpackage :cabal-mediator
    (:use :cl))
  (in-package :cabal-mediator)

  (defgeneric receive-message (cabal message))
  (defgeneric send-message-to-network (cabal message))

  ;; The Mediator
  (defclass grand-hierophant ()
    ((cabals :initform nil :accessor managed-cabals)))

  (defmethod register-cabal ((hierophant grand-hierophant) cabal)
    (push cabal (managed-cabals hierophant))
    (setf (slot-value cabal 'mediator) hierophant))

  (defmethod broadcast ((hierophant grand-hierophant) sender message)
    (dolist (c (managed-cabals hierophant))
      (unless (eq c sender)
        (receive-message c message))))

  ;; The Colleague
  (defclass cult-faction ()
    ((name :initarg :name :reader faction-name)
     (mediator :initform nil)))

  (defmethod receive-message ((f cult-faction) message)
    (format t "[~a] receives telepathic whisper: ~a~%" (faction-name f) message))

  (defmethod send-message-to-network ((f cult-faction) message)
    (format t "[~a] transmits to the Hierophant: ~a~%" (faction-name f) message)
    (broadcast (slot-value f 'mediator) f message))
tags: [lisp, behavioral, mediator, network, telepathy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator of the Dark Cabals

Factions within the Esoteric Order are deeply paranoid. The Cult of the Black Goat does not trust the Brotherhood of the Yellow Sign, and neither will directly establish socket connections with the other. A spiderweb of peer-to-peer references would lead to rapid backstabbing and memory leaks.

Enter the Mediator, played here by the `grand-hierophant`. All factions (`cult-faction`) maintain exactly one reference: their telepathic link to the Mediator. When a faction wishes to coordinate a planetary alignment, they invoke `send-message-to-network`. The Hierophant receives the intent and dynamically routes it to all other registered cabals via `receive-message`. The factions remain beautifully decoupled, isolated in their dark corners of the system architecture.
