---
title: The Strategy Pattern in VBA
description: Interchange deadly combat maneuvers dynamically, swapping out algorithms without disturbing the core entity.
type: vba
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Spreadsheet Necromancy"
formula: |2
  ' Interface: IEvocationStrategy (Class Module)
  Public Function CalculateDamage(baseMana As Double) As Double
  End Function
  
  ' Class: HellfireStrategy (Class Module)
  Implements IEvocationStrategy
  Private Function IEvocationStrategy_CalculateDamage(baseMana As Double) As Double
      ' Massive burst, high variance
      IEvocationStrategy_CalculateDamage = baseMana * 2.5
  End Function
  
  ' Class: VoidDrainStrategy (Class Module)
  Implements IEvocationStrategy
  Private Function IEvocationStrategy_CalculateDamage(baseMana As Double) As Double
      ' Consistent, lower damage, ignores armor
      IEvocationStrategy_CalculateDamage = baseMana + 50
  End Function
  
  ' Class: WarlockContext (Class Module)
  Private pStrategy As IEvocationStrategy
  
  Public Sub SetStrategy(strat As IEvocationStrategy)
      Set pStrategy = strat
  End Sub
  
  Public Sub ExecuteAttack(target As Range, baseMana As Double)
      Dim dmg As Double
      dmg = pStrategy.CalculateDamage(baseMana)
      target.Value = target.Value - dmg
  End Sub
  
  ' Client
  Public Sub WarRitual()
      Dim warlock As New WarlockContext
      
      ' Attack with Hellfire
      warlock.SetStrategy New HellfireStrategy
      warlock.ExecuteAttack Sheet1.Range("A1"), 100
      
      ' Switch tactics dynamically
      warlock.SetStrategy New VoidDrainStrategy
      warlock.ExecuteAttack Sheet1.Range("A1"), 100
  End Sub
tags: [vba, strategy, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Strategy: The Interchangeable Hex

When your macros require multiple variations of an algorithm—such as parsing different date formats, calculating various tax schemas, or applying distinct evocation damage types—hardcoding them with massive `If` statements binds your code into an unmanageable knot.

The Strategy pattern defines a family of algorithms, encapsulates each one into a separate class, and makes them interchangeable. The `WarlockContext` holds a reference to an `IEvocationStrategy`. At runtime, the spreadsheet necromancer can hot-swap the strategy, instantly changing the entity's attack pattern without altering its core architecture.
