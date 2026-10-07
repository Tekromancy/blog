---
title: The Chain of Responsibility Hex
description: Passing a request along a chain of handlers dynamically.
type: groovy
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Flowmancy"
formula: |2
  class SecurityFirewall {
      Closure handler

      void process(String packet) {
          if (handler) handler(packet)
      }
  }

  def ipBlocker = { packet -> 
      if (packet.contains("EVIL_IP")) println "Blocked by IP filter"
      else next(packet) 
  }

  def payloadScanner = { packet ->
      if (packet.contains("VIRUS")) println "Blocked by Payload Scanner"
      else println "Packet accepted: $packet"
  }

  // Groovy closure composition for the chain
  def createChain = { ...closures ->
      def chain = closures.reverse().inject({ p -> println "End of chain" }) { nextLink, currentLink ->
          def bound = currentLink.clone()
          bound.delegate = [next: nextLink]
          bound.resolveStrategy = Closure.DELEGATE_FIRST
          bound
      }
      return chain
  }

  def firewall = new SecurityFirewall(handler: createChain(ipBlocker, payloadScanner))
  firewall.process("Good Data")
  firewall.process("EVIL_IP Data")
tags: [groovy, behavioral, chain-of-responsibility, closures, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Chain of Responsibility Hex

Instead of defining rigid classes with `setNext()`, an Archmage manipulates Groovy closures and changes their delegate structure to pass the execution context forward. This creates a functional, highly dynamic chain of responsibility where security protocols and data transformers can be woven together at runtime.
