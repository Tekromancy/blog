---
title: The Chain of Responsibility
description: Pass a request along a chain of magical handlers until one resolves it.
type: unison
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation Routing"
formula: |2
  structural type SpellRequest = SpellRequest Text
  
  type Handler = SpellRequest -> Optional Text
  
  fireHandler : Handler
  fireHandler req = match req with
    SpellRequest "fire" -> Some "Cast Fireball!"
    _ -> None
    
  iceHandler : Handler
  iceHandler req = match req with
    SpellRequest "ice" -> Some "Cast Ice Storm!"
    _ -> None
    
  chain : [Handler] -> SpellRequest -> Optional Text
  chain handlers req =
    List.foldLeft (acc h -> match acc with
      Some res -> Some res
      None -> h req
    ) None handlers
    
  masterEvoker : SpellRequest -> Optional Text
  masterEvoker = chain [fireHandler, iceHandler]
tags: [behavioral, chain-of-responsibility, unison, lists, functional]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Chain of Responsibility takes a functional form in Unison. Rather than objects holding references to their successors, we define handlers as simple functions returning an `Optional` result. The chain itself is a sequence of these functions, folded over the request. The arcane weave traverses the list of handlers until a non-empty result (`Some`) is discovered, at which point the spell resolves.
