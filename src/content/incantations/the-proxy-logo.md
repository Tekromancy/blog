---
title: "Proxy: The Leyline Warden"
description: "Control access to the sacred drawing procedures by wrapping them in a proxy that checks for sufficient mana (ink) before tracing."
type: logo
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  make "turtle-mana 50

  to real-draw-sigil
    repeat 4 [ fd 20 rt 90 ]
  end

  to proxy-draw-sigil
    ifelse :turtle-mana > 10 [
      make "turtle-mana :turtle-mana - 10
      real-draw-sigil
      print [Sigil drawn. Mana depleted.]
    ] [
      print [Insufficient mana to pierce the veil.]
    ]
  end

  ; Divination attempts
  proxy-draw-sigil
  proxy-draw-sigil
tags: [turtle-divination, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
