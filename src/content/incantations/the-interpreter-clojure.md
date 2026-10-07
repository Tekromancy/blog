---
title: The Interpreter Incantation
description: Defining a grammarian matrix to parse and execute domain-specific arcana.
type: clojure
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Divination // Linguistics
formula: |
  (ns tekromancy.interpreter)
  
  ;; Clojure's macros and `eval` are the ultimate interpreters, but 
  ;; for a simple abstract syntax tree:
  
  (defmulti evaluate-ast :type)
  
  (defmethod evaluate-ast :literal [node]
    (:value node))
  
  (defmethod evaluate-ast :add [node]
    (+ (evaluate-ast (:left node))
       (evaluate-ast (:right node))))
  
  (defmethod evaluate-ast :spell [node]
    (str "Casting " (:name node) " at power " (evaluate-ast (:power node))))
  
  ;; Usage:
  ;; (def my-ast {:type :spell 
  ;;              :name "Nova" 
  ;;              :power {:type :add 
  ;;                      :left {:type :literal :value 10} 
  ;;                      :right {:type :literal :value 20}}})
  ;; (evaluate-ast my-ast)
tags: [behavioral, interpreter, clojure, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Lisp inherently blurs the line between data and code. To build an Interpreter is simply to define how data trees map to execution. By parsing an Abstract Syntax Tree of magical instructions using multimethods, one can execute foreign esoteric dialects safely within the JVM.
