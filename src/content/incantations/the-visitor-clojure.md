---
title: The Visitor Incantation
description: Traversing a complex structure of glyphs to execute external logic over them.
type: clojure
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Examination"
formula: |2
  (ns tekromancy.visitor
    (:require [clojure.walk :as walk]))

  ;; The visitor pattern is easily solved by data-walking mechanisms.

  (def spell-tree
    {:type :root
     :nodes [{:type :fire :power 10}
             {:type :ice :power 5}
             {:type :cluster
              :nodes [{:type :fire :power 20}]}]})

  (defn power-boosting-visitor [node]
    (if (and (map? node) (:power node))
      (update node :power * 2)
      node))

  (defn apply-visitor [tree visitor-fn]
    (walk/postwalk visitor-fn tree))

  ;; Usage:
  ;; (apply-visitor spell-tree power-boosting-visitor)
tags: [behavioral, visitor, clojure, clojure-walk]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When parsing an enormous tree of magical AST nodes, embedding logic into each node is foolish. The Visitor pattern extracts the operations out. Using Clojure's powerful `clojure.walk/postwalk`, we can apply our visiting function across every node in the complex structure without mutating the original tree.
