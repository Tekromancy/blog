---
title: The Observer Pattern in VBA
description: Bind a legion of ethereal watchers to a core entity, ensuring they react instantly when the entity mutates.
type: vba
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Spreadsheet Necromancy"
formula: |2
  ' Interface: IObserver (Class Module)
  Public Sub Update(data As Variant)
  End Sub
  
  ' Class: SubjectEntity (Class Module)
  Private pObservers As Collection
  Private pState As Variant
  
  Private Sub Class_Initialize()
      Set pObservers = New Collection
  End Sub
  
  Public Sub Attach(obs As IObserver)
      pObservers.Add obs
  End Sub
  
  Public Sub SetState(newState As Variant)
      pState = newState
      NotifyObservers
  End Sub
  
  Private Sub NotifyObservers()
      Dim obs As IObserver
      For Each obs In pObservers
          obs.Update pState
      Next obs
  End Sub
  
  ' Class: CellWatcher (Class Module)
  Implements IObserver
  Private pTarget As Range
  
  Public Sub Init(target As Range)
      Set pTarget = target
  End Sub
  
  Private Sub IObserver_Update(data As Variant)
      pTarget.Value = "Subject is now: " & data
  End Sub
  
  ' Client
  Public Sub DivinationRitual()
      Dim core As New SubjectEntity
      
      Dim w1 As New CellWatcher: w1.Init Sheet1.Range("A1")
      Dim w2 As New CellWatcher: w2.Init Sheet1.Range("A2")
      
      core.Attach w1
      core.Attach w2
      
      ' Watchers update automatically
      core.SetState "Awake"
  End Sub
tags: [vba, observer, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer: The All-Seeing Eyes

A common scenario in Spreadsheet Necromancy involves multiple charts, userform elements, or dashboard cells needing to update when a single underlying data set changes. Hardcoding the update for every single dependent item is brittle and invites chaos.

The Observer pattern establishes a publish-subscribe relationship. The `SubjectEntity` holds the core data. When its state mutates, it iterates through a collection of `IObserver` attachments, broadcasting its new state. The watchers, tethered by dark divination, react autonomously. You can add or remove eyes dynamically without modifying the subject.
