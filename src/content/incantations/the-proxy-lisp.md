---
title: "The Proxy of the Sealed God"
description: "Delaying the instantiation of an apocalyptic entity until absolutely necessary."
type: lisp
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Containment
formula: |
  (defpackage :sealed-proxy
    (:use :cl))
  (in-package :sealed-proxy)
  
  (defgeneric smite-world (entity target))
  
  ;; The Real Subject
  (defclass true-cthulhu ()
    ((awoken :initform t)))
  
  (defmethod initialize-instance :after ((c true-cthulhu) &key)
    (format t "[EXPENSIVE] The oceans boil! True Cthulhu is loaded into memory!~%"))
  
  (defmethod smite-world ((c true-cthulhu) target)
    (format t "True Cthulhu crushes ~a into cosmic dust.~%" target))
  
  ;; The Proxy
  (defclass idol-of-cthulhu ()
    ((real-instance :initform nil :accessor real-instance)))
  
  (defmethod smite-world ((proxy idol-of-cthulhu) target)
    (format t "The idol resonates... checking containment...~%")
    (unless (real-instance proxy)
      (format t "The seal is broken! Instantiating the True Subject!~%")
      (setf (real-instance proxy) (make-instance 'true-cthulhu)))
    (smite-world (real-instance proxy) target))
tags: [lisp, structural, proxy, containment, lazy-loading]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy of the Sealed God

Certain objects are simply too heavy, too dangerous, and too dimensionally unstable to load into the Lisp image upon startup. If `true-cthulhu` is instantiated during normal system operation, the sheer computational horror will crash the physical server.

The Proxy pattern provides a harmless, lightweight surrogate—an `idol-of-cthulhu`. To the rest of the application, the idol implements the exact same interface (`smite-world`). However, it lazily intercepts the request, only paying the terrible cost of instantiating the real subject exactly when the method is finally invoked. Until that dark day, the idol consumes almost zero memory.
