---
title: The Mediator Nexus
description: Centralizes complex communications between disparate magical guilds.
type: koka
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Illusion // Telepathy"
formula: |2
  effect nexus
    ctl broadcast(sender: string, message: string) : ()
  
  fun with-nexus(action: () -> <nexus|e> a) : e a
    with handler
      ctl broadcast(s, m) { println("[" ++ s ++ " broadcasts]: " ++ m); resume(()) }
    action()
  
  pub fun main()
    with with-nexus
    broadcast("Pyromancers", "We need more brimstone!")
    broadcast("Cryomancers", "Keep the heat down!")
tags: [koka, mediator, message-bus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
