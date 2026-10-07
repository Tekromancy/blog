---
title: The State Shifter
description: Allowing an entity to alter its behavior when its internal aetheric state changes.
type: fsharp
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shapeshifting"
formula: |2
  type IElementalState =
      abstract member Attack: unit -> string
      abstract member Morph: unit -> IElementalState

  type FireState() =
      interface IElementalState with
          member _.Attack() = "Hurls a fireball!"
          member _.Morph() = 
              printfn "Cooling down..."
              WaterState() :> IElementalState

  and WaterState() =
      interface IElementalState with
          member _.Attack() = "Casts a tidal wave!"
          member _.Morph() = 
              printfn "Heating up..."
              FireState() :> IElementalState

  type ElementalFamiliar() =
      let mutable state : IElementalState = FireState()

      member _.Action() = printfn "%s" (state.Attack())
      member _.Shift() = state <- state.Morph()

  let familiar = ElementalFamiliar()
  familiar.Action()
  familiar.Shift()
  familiar.Action()
tags: [behavioral, state, fsharp, shapeshifting]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern is the essence of shapeshifting. As the familiar morphs between fire and water, its interface remains identical, but the internal matrix alters its responses dynamically. In F#, discriminated unions with state-transition functions are often an even stronger functional alternative.
