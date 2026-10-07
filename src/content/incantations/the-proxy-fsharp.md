---
title: The Proxy Homunculus
description: A stand-in entity controlling access to a more powerful, resource-intensive spell matrix.
type: fsharp
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Illusion // Constructs
formula: |
  type IGrimoire =
      abstract member ReadSecret: unit -> string

  type ForbiddenGrimoire() =
      do printfn "Unsealing the Forbidden Grimoire... (Heavy Mana Cost)"
      interface IGrimoire with
          member _.ReadSecret() = "The true name of the Arch-Demon is..."

  type GrimoireProxy(isArchmage: bool) =
      let mutable realGrimoire: ForbiddenGrimoire option = None

      interface IGrimoire with
          member _.ReadSecret() =
              if not isArchmage then
                  "Access Denied. You lack the requisite rank."
              else
                  if realGrimoire.IsNone then
                      realGrimoire <- Some(ForbiddenGrimoire())
                  (realGrimoire.Value :> IGrimoire).ReadSecret()

  let apprenticeProxy = GrimoireProxy(false)
  printfn "Apprentice: %s" ((apprenticeProxy :> IGrimoire).ReadSecret())

  let archmageProxy = GrimoireProxy(true)
  printfn "Archmage: %s" ((archmageProxy :> IGrimoire).ReadSecret())
tags: [structural, proxy, fsharp, homunculus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Proxy Homunculus delays the instantiation of the True Grimoire until absolutely necessary and strictly enforces the security clearance required to gaze upon its forbidden secrets.
