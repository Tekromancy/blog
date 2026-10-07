---
title: The Mediator
description: Centralizing telepathic communication between warring hospital wards.
type: mumps
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Mind-Linking"
formula: |2
  MEDIATOR ; Mediator Pattern in MUMPS
  ;
  BROADCAST(SENDER, MSG) ;
    ; The Mediator function routing messages
    W "[",SENDER,"] broadcasts: ",MSG,!
    I SENDER="ICU" D SEND("MORGUE", "Prepare for incoming.")
    I SENDER="MORGUE" D SEND("ICU", "We are full. Stop dying.")
    Q
  ;
  SEND(TARGET, MSG) ;
    W "  -> Message delivered to ",TARGET,": ",MSG,!
    Q
tags: [behavioral, mediator, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
