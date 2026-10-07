---
title: The Factory Method Pattern in VBA
description: Delegate the exact instantiation of grimoire objects to subclasses, allowing the spreadsheet to adapt dynamically.
type: vba
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Spreadsheet Necromancy"
formula: |2
  ' Interface: ISpellcaster (Class Module)
  Public Sub CastSpell()
  End Sub
  
  ' Class: MacroCaster (Class Module)
  Implements ISpellcaster
  Private Sub ISpellcaster_CastSpell()
      Debug.Print "Executing legacy macro..."
  End Sub
  
  ' Class: VBScriptCaster (Class Module)
  Implements ISpellcaster
  Private Sub ISpellcaster_CastSpell()
      Debug.Print "Invoking external VBScript daemon..."
  End Sub
  
  ' Abstract Creator: SpellcasterFactory (Class Module)
  ' VBA lacks true inheritance, so we use an interface for the factory method
  Public Function CreateCaster() As ISpellcaster
  End Function
  
  ' Concrete Creator: MacroFactory (Class Module)
  Implements SpellcasterFactory
  Private Function SpellcasterFactory_CreateCaster() As ISpellcaster
      Set SpellcasterFactory_CreateCaster = New MacroCaster
  End Function
tags: [vba, factory-method, creational, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Factory Method: The Summoning Circle

In Spreadsheet Necromancy, the Factory Method acts as a specialized summoning circle. Instead of the main execution thread determining exactly which minion to summon, it relies on a dedicated factory to make the choice. 

Since VBA lacks traditional inheritance, we simulate the Factory Method using an interface for the creator class. This decouples your core logic from the specific classes being instantiated. When a new type of daemon must be integrated into the grid, you simply add a new creator implementation without disturbing the ancient, sleeping macros of the main ritual.
