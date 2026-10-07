---
title: The Command Scroll
description: Encapsulates a request as an object, allowing parameterization of spell scrolls.
type: koka
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Scribing"
formula: |2
  type command
    CastFireball(target: string)
    Heal(target: string)
  
  fun execute(cmd: command) : ()
    match cmd
      CastFireball(t) -> println("Fireball erupts towards " ++ t)
      Heal(t) -> println("Healing light surrounds " ++ t)
  
  pub fun main()
    val scroll-queue = [CastFireball("Goblin"), Heal("Ally"), CastFireball("Dragon")]
    scroll-queue.map(execute)
tags: [koka, command, adt]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
