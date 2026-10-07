---
title: The Visitor (Racket)
description: Adding new operations to existing magical structures without modifying them.
type: racket
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Taxonomy"
formula: |2
  #lang racket

  (struct beast (name) #:transparent)
  (struct spirit (element) #:transparent)

  ;; Visitors
  (define (appraise-visitor entity)
    (cond
      [(beast? entity) (format "A strong beast named ~a." (beast-name entity))]
      [(spirit? entity) (format "An ethereal spirit of ~a." (spirit-element entity))]
      [else "Unknown entity."]))

  (define (banish-visitor entity)
    (cond
      [(beast? entity) (format "Chasing away ~a." (beast-name entity))]
      [(spirit? entity) (format "Exorcising the ~a spirit." (spirit-element entity))]
      [else "Cannot banish."]))

  (define b (beast "Cerberus"))
  (define s (spirit "Void"))

  (displayln (appraise-visitor b))
  (displayln (banish-visitor s))
tags: [racket, behavioral, visitor, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Visitor

When new scholars need to examine the compendium of creatures, we shouldn't force the creatures themselves to learn new tricks. The Visitor pattern uses pattern matching (`cond` and predicates) to traverse an object structure and apply new, detached logic. Pure taxonomy without contamination.
