---
title: The Mediator Nexus
description: Centralizing complex communications between disparate magical entities to prevent chaotic cross-talk.
type: fsharp
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Telepathy"
formula: |2
  type IMediator =
      abstract member Broadcast: string * Magus -> unit

  and Magus(name: string, nexus: IMediator) =
      member _.Name = name
      member this.Send(msg) =
          printfn "%s sends: %s" name msg
          nexus.Broadcast(msg, this)
      member _.Receive(msg) =
          printfn "%s hears in their mind: %s" name msg

  type TelepathicNexus() =
      let mutable members : Magus list = []

      member _.Join(magus) = members <- magus :: members

      interface IMediator with
          member _.Broadcast(msg, sender) =
              members 
              |> List.filter (fun m -> m.Name <> sender.Name)
              |> List.iter (fun m -> m.Receive(msg))

  let nexus = TelepathicNexus()
  let alice = Magus("Alice", nexus)
  let bob = Magus("Bob", nexus)
  let charlie = Magus("Charlie", nexus)

  nexus.Join(alice)
  nexus.Join(bob)
  nexus.Join(charlie)

  alice.Send("The wards are failing!")
tags: [behavioral, mediator, fsharp, nexus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Telepathic Nexus untangles the web of communication. Instead of magi casting sending spells to everyone directly, they project their thoughts into the Mediator, which routes the aetheric whispers safely.
