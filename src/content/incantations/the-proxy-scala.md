---
title: The Proxy Sentinel
description: Control access to an astronomically expensive artifact until it is strictly necessary to invoke it.
type: scala
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Warding
formula: |
  trait Oracle {
    def scry(target: String): String
  }

  class TrueOracle extends Oracle {
    // Expensive initialization
    Thread.sleep(1000) 
    override def scry(target: String): String = s"I see $target's doom."
  }

  class ProxyOracle extends Oracle {
    private lazy val trueOracle = new TrueOracle()
    
    override def scry(target: String): String = {
      if (target == "Forbidden") "Access Denied by Proxy."
      else trueOracle.scry(target)
    }
  }
tags: [scala, structural, lazy-evaluation, warding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using Scala's `lazy val`, the Proxy defers the creation of the underlying TrueOracle until absolutely required, while also providing a layer of access control.
