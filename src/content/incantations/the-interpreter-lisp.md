---
title: "The Interpreter of R'lyehian Dialects"
description: "Parsing and evaluating the non-euclidean syntax of the Old Ones."
type: lisp
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  (defpackage :rlyehian-interpreter
    (:use :cl))
  (in-package :rlyehian-interpreter)

  ;; Abstract Expression
  (defgeneric interpret-glyph (expression context))

  ;; Context
  (defclass occult-context ()
    ((madness-level :initform 0 :accessor madness-level)))

  ;; Terminal Expression
  (defclass phnglui-glyph () ()) ; "In his house at R'lyeh"
  (defmethod interpret-glyph ((g phnglui-glyph) context)
    (incf (madness-level context) 10)
    "Subject dreams. ")

  (defclass fhtagn-glyph () ()) ; "Waits dreaming"
  (defmethod interpret-glyph ((g fhtagn-glyph) context)
    (incf (madness-level context) 20)
    "Subject waits. ")

  ;; Non-Terminal Expression
  (defclass sequence-expression ()
    ((expressions :initarg :exprs :reader get-exprs)))

  (defmethod interpret-glyph ((seq sequence-expression) context)
    (let ((result ""))
      (dolist (expr (get-exprs seq))
        (setf result (concatenate 'string result (interpret-glyph expr context))))
      result))

  ;; Example execution:
  ;; (let ((ctx (make-instance 'occult-context))
  ;;       (chant (make-instance 'sequence-expression 
  ;;                             :exprs (list (make-instance 'phnglui-glyph)
  ;;                                          (make-instance 'fhtagn-glyph)))))
  ;;   (interpret-glyph chant ctx))
tags: [lisp, behavioral, interpreter, parsing, linguistics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Interpreter of R'lyehian Dialects

To mortals, "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn" is gibberish. To the Lisp reader, it is a nested syntax tree crying out for evaluation. When mapping ancient, domain-specific tongues into executable logic, the Interpreter pattern provides the foundation of our linguistic compiler.

We define an AST (Abstract Syntax Tree) using CLOS objects. Terminal nodes like `phnglui-glyph` directly mutate the `occult-context` (often drastically increasing the madness variables), while non-terminal nodes like `sequence-expression` recursively call `interpret-glyph` down the tree. Through this pattern, the alien syntax is parsed, evaluated, and translated into the semantic logic of the Lisp system.
