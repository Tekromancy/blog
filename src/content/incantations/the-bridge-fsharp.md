---
title: The Bridge Matrix
description: Decoupling a magical abstraction from its elemental implementation.
type: fsharp
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Transmutation // Matrix
formula: |
  type IElementalSource =
      abstract member Channel: unit -> string

  type FireSource() =
      interface IElementalSource with
          member _.Channel() = "Flames roar!"

  type FrostSource() =
      interface IElementalSource with
          member _.Channel() = "Ice crackles!"

  [<AbstractClass>]
  type Spell(source: IElementalSource) =
      member _.Source = source
      abstract member Cast: unit -> unit

  type EvocationSpell(source: IElementalSource) =
      inherit Spell(source)
      override this.Cast() =
          printfn "Casting evocation: %s" (this.Source.Channel())

  let fireEvocation = EvocationSpell(FireSource())
  fireEvocation.Cast()
tags: [structural, bridge, fsharp, elemental]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern allows the abstraction of spell-casting to vary independently from the raw elemental source it taps into. This dual-hierarchy system prevents the proliferation of classes like `FireEvocation`, `FrostEvocation`, and so forth.
