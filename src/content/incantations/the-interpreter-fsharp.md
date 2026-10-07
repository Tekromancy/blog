---
title: The Interpreter Lexicon
description: Designing an abstract syntax tree to parse and execute forgotten runic languages.
type: fsharp
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  type Context() =
      let mutable knowledge = Map.empty<string, int>
      member _.Set(k, v) = knowledge <- knowledge.Add(k, v)
      member _.Get(k) = knowledge.TryFind(k) |> Option.defaultValue 0

  type IExpression =
      abstract member Interpret: Context -> int

  type Variable(name: string) =
      interface IExpression with
          member _.Interpret(ctx) = ctx.Get(name)

  type AddExpression(left: IExpression, right: IExpression) =
      interface IExpression with
          member _.Interpret(ctx) = left.Interpret(ctx) + right.Interpret(ctx)

  // Parsing "Mana + Intellect"
  let ctx = Context()
  ctx.Set("Mana", 50)
  ctx.Set("Intellect", 20)

  let mana = Variable("Mana") :> IExpression
  let intl = Variable("Intellect") :> IExpression
  let spellPower = AddExpression(mana, intl) :> IExpression

  printfn "Total Spell Power: %d" (spellPower.Interpret(ctx))
tags: [behavioral, interpreter, fsharp, lexicon]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Through Active Patterns and Abstract Syntax Trees, F# is uniquely suited for the Interpreter pattern. Here, we build a basic evaluator for arcane formulas, parsing the leylines of raw syntax into calculable magical force.
