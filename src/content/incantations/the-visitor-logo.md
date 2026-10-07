---
title: "Visitor: The Spirits of Inspection"
description: "Send ethereal visitor functions through a list of disparate shape records to either draw them, count their vertices, or measure their perimeter."
type: logo
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Ethereal Inspection"
formula: |2
  make "astral-shapes [ [circle 50] [square 40] [circle 10] ]

  to accept-visitor :shapes :visitor
    foreach :shapes [ run list :visitor ? ]
  end

  to draw-visitor :shape
    localmake "type first :shape
    localmake "val last :shape
    if equal? :type "circle [ arc 360 :val ]
    if equal? :type "square [ repeat 4 [ fd :val rt 90 ] ]
    pu fd 60 pd
  end

  to mana-cost-visitor :shape
    localmake "type first :shape
    if equal? :type "circle [ print [Mana cost: High] ]
    if equal? :type "square [ print [Mana cost: Low] ]
  end

  ; Algorithmic Pathfinding via multiple passes
  accept-visitor :astral-shapes "draw-visitor
  accept-visitor :astral-shapes "mana-cost-visitor
tags: [turtle-divination, Lisp-like]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
