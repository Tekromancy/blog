---
title: The Composite of Form Controls
description: Treating a chaotic tree of ActiveX forms as a single entity.
type: vb
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Structure"
formula: |2
  ' IComponent.cls
  Public Sub Render()
  End Sub

  ' LeafControl.cls
  Implements IComponent
  Private Sub IComponent_Render()
      ' Draw the cursed UI element
  End Sub

  ' ControlContainer.cls
  Implements IComponent
  Private m_children As Collection

  Private Sub Class_Initialize()
      Set m_children = New Collection
  End Sub

  Public Sub Add(c As IComponent)
      m_children.Add c
  End Sub

  Private Sub IComponent_Render()
      Dim child As IComponent
      On Error Resume Next
      For Each child In m_children
          child.Render
      Next child
  End Sub
tags: [composite, ui, activex]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When a user interface is woven from dozens of volatile ActiveX components, the Composite pattern allows the Archmage to treat individual elements and their containers with a uniform incantation.
