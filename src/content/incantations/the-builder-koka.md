---
title: The Builder Formula
description: A creational hex that constructs complex magical constructs step-by-step using a linear effect state.
type: koka
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Golemancy"
formula: |2
  struct golem( head: string = "mud", body: string = "mud", arms: string = "mud", legs: string = "mud" )
  
  effect golem-builder
    ctl set-head(material: string): ()
    ctl set-body(material: string): ()
    ctl set-arms(material: string): ()
    ctl set-legs(material: string): ()
    ctl build(): golem
  
  fun with-builder(action: () -> <golem-builder|e> a): e a
    var g := golem()
    with handler
      ctl set-head(m) { g = g(head = m); resume(()) }
      ctl set-body(m) { g = g(body = m); resume(()) }
      ctl set-arms(m) { g = g(arms = m); resume(()) }
      ctl set-legs(m) { g = g(legs = m); resume(()) }
      ctl build()     resume(g)
    action()
  
  pub fun main()
    with with-builder
    set-head("obsidian")
    set-body("granite")
    val my-golem = build()
    println(my-golem.head ++ " head golem summoned.")
tags: [koka, builder, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
