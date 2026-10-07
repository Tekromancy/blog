---
title: The Proxy Homunculus
description: Controls access to a master wizard through a loyal homunculus effect handler.
type: koka
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Conjuration // Homunculi"
formula: |2
  effect wizard
    ctl ask-secret(password: string) : string
  
  fun master-wizard(action: () -> <wizard|e> a) : e a
    with handler
      ctl ask-secret(_) resume("The universe is a hologram")
    action()
  
  fun proxy-wizard(action: () -> <wizard|e> a) : <wizard|e> a
    with handler
      ctl ask-secret(pwd)
        if pwd == "mellon" then resume(ask-secret(pwd))
        else resume("Access denied by the Homunculus!")
    action()
  
  pub fun main()
    with master-wizard
    with proxy-wizard
    println(ask-secret("wrong"))
    println(ask-secret("mellon"))
tags: [koka, proxy, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
