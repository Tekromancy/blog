---
title: "The Strategy of the Sacrificial Altar"
description: "Swapping algorithms for dark offerings at runtime depending on the deity invoked."
type: lisp
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Necromancy // Algorithmic Sacrifice
formula: |
  (defpackage :sacrificial-strategy
    (:use :cl))
  (in-package :sacrificial-strategy)
  
  ;; The Strategy Interface
  (defgeneric execute-sacrifice (strategy victim))
  
  ;; Concrete Strategies
  (defclass blood-letting-strategy () ())
  (defmethod execute-sacrifice ((s blood-letting-strategy) victim)
    (format t "Draining the vital fluids from ~a for the vampiric lords.~%" victim))
  
  (defclass pyre-strategy () ())
  (defmethod execute-sacrifice ((s pyre-strategy) victim)
    (format t "Consuming ~a in eldritch green flames for the Fire Vampires.~%" victim))
  
  (defclass void-banishment-strategy () ())
  (defmethod execute-sacrifice ((s void-banishment-strategy) victim)
    (format t "Shattering ~a across parallel dimensions.~%" victim))
  
  ;; The Context
  (defclass high-altar ()
    ((active-strategy :initarg :strategy :accessor altar-strategy)))
  
  (defmethod perform-ritual ((altar high-altar) victim)
    (format t "The chanting begins...~%")
    (execute-sacrifice (altar-strategy altar) victim)
    (format t "The gods are appeased.~%"))
tags: [lisp, behavioral, strategy, sacrifice, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Strategy of the Sacrificial Altar

The method of appeasement varies wildly across the cosmic pantheon. While the vampiric lords demand fluid algorithms, the Fire Vampires of Fomalhaut require thermal combustion loops. Hardcoding these variations into the Altar object would defile its pure architecture.

The Strategy pattern externalizes the algorithmic execution into distinct classes. The `high-altar` holds a pointer to its `active-strategy`. When the `perform-ritual` method is invoked, it delegates the violent calculations to the active strategy object. If the High Priest suddenly realizes they are invoking Azathoth instead of Cthulhu, they can hotswap the `altar-strategy` at runtime, saving their own lives and optimizing the appeasement process.
