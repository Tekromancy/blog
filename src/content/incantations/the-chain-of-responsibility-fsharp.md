---
title: The Chain of Responsibility Wards
description: Passing a magical anomaly through a gauntlet of warding sigils until it is neutralized.
type: fsharp
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Defense"
formula: |2
  type ThreatLevel = Low | Medium | High

  type IWard =
      abstract member HandleThreat: ThreatLevel -> bool
      abstract member SetNext: IWard -> unit

  [<AbstractClass>]
  type BaseWard() =
      let mutable nextWard: IWard option = None
      member _.SetNext(ward) = nextWard <- Some ward
      member _.PassOn(threat) =
          match nextWard with
          | Some w -> w.HandleThreat(threat)
          | None -> false

  type OuterWard() =
      inherit BaseWard()
      interface IWard with
          member this.SetNext(w) = this.SetNext(w)
          member this.HandleThreat(threat) =
              if threat = Low then 
                  printfn "Outer Ward neutralized a low-level threat."
                  true
              else this.PassOn(threat)

  type InnerSanctumWard() =
      inherit BaseWard()
      interface IWard with
          member this.SetNext(w) = this.SetNext(w)
          member this.HandleThreat(threat) =
              if threat = Medium || threat = High then 
                  printfn "Inner Sanctum unleashed holy fire to neutralize the threat!"
                  true
              else this.PassOn(threat)

  let outer = OuterWard() :> IWard
  let inner = InnerSanctumWard() :> IWard
  outer.SetNext(inner)

  outer.HandleThreat(Medium) |> ignore
tags: [behavioral, chain-of-responsibility, fsharp, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A magical attack strikes the outermost ward. If it lacks the capacity to absorb the blow, it is chained to the deeper, more ancient sigils until the threat is extinguished or the sanctuary falls.
