---
title: The Decorator Ward
description: Dynamically weaving additional protective layers onto an existing spell.
type: fsharp
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Layering"
formula: |2
  type ISpell =
      abstract member Cast: unit -> string

  type BaseSpell() =
      interface ISpell with
          member _.Cast() = "A fundamental pulse of magic."

  type SpellDecorator(spell: ISpell) =
      interface ISpell with
          member _.Cast() = spell.Cast()

  type EmpoweredSpell(spell: ISpell) =
      inherit SpellDecorator(spell)
      interface ISpell with
          member _.Cast() = (spell.Cast()) + " Now crackling with raw power!"

  type EchoingSpell(spell: ISpell) =
      inherit SpellDecorator(spell)
      interface ISpell with
          member _.Cast() = (spell.Cast()) + " It echoes across the astral plane."

  let coreSpell = BaseSpell()
  let empowered = EmpoweredSpell(coreSpell)
  let echoedAndEmpowered = EchoingSpell(empowered)

  printfn "%s" ((echoedAndEmpowered :> ISpell).Cast())
tags: [structural, decorator, fsharp, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rather than subclassing `EmpoweredEchoingSpell`, the Decorator pattern allows magi to layer sigils sequentially, wrapping a core invocation in successive augmenting runes.
