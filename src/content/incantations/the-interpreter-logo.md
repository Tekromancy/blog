---
title: "Interpreter: The Parser of the Void"
description: "Evaluate a custom language of mystical runes, translating symbolic characters directly into sacred geometry turtle movements."
type: logo
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Symbology"
formula: |2
  to interpret-runes :rune-string
    if empty? :rune-string [ stop ]
    localmake "rune first :rune-string

    if equal? :rune "F [ fd 20 ]
    if equal? :rune "R [ rt 90 ]
    if equal? :rune "L [ lt 90 ]
    if equal? :rune "S [ setpencolor [255 255 0] arc 360 10 ]

    interpret-runes bf :rune-string
  end

  ; Divination through ancient strings
  interpret-runes "FFRFFRFFRFFS
tags: [turtle-divination, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
