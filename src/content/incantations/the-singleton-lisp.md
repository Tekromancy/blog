---
title: "The Singleton of Azathoth"
description: "Ensuring only one instance of the Blind Idiot God exists in the runtime environment."
type: lisp
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Conjuration // Cosmic Binding
formula: |
  (defpackage :singleton-azathoth
    (:use :cl)
    (:export #:get-azathoth #:azathoth-awaken))
  
  (in-package :singleton-azathoth)
  
  (defclass blind-idiot-god ()
    ((slumbering :initform t :accessor is-slumbering-p)
     (pipers :initform 1000 :reader num-pipers)))
  
  ;; We use a lexical closure to hide the singleton instance.
  (let ((the-center-of-the-universe nil))
    (defun get-azathoth ()
      "Retrieve the singular instance of Azathoth. Creates it if it doesn't exist."
      (unless the-center-of-the-universe
        (format t "The Daemon Sultan is instantiated at the center of infinity.~%")
        (setf the-center-of-the-universe (make-instance 'blind-idiot-god)))
      the-center-of-the-universe))
  
  (defmethod azathoth-awaken ((god blind-idiot-god))
    (setf (is-slumbering-p god) nil)
    (format t "Azathoth awakens. The garbage collector will now devour all existence.~%")
    #+sbcl (sb-ext:quit)
    #-sbcl (quit))
tags: [lisp, creational, singleton, azathoth, macros]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Singleton of Azathoth

There can be only one Daemon Sultan. A second instance of Azathoth would mean a paradox in the fabric of the Lisp image, corrupting the heap and collapsing the stack into a singularity.

To guarantee that only one instance of the Blind Idiot God exists, we seal the instance within a lexical closure (the `let` block over `the-center-of-the-universe`). No external macro or function can touch the binding directly; they must commune through `get-azathoth`. This guarantees thread-safety (with some minor mutex additions if multiple threads chant simultaneously) and preserves the cosmic order.
