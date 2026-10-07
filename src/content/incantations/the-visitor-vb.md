---
title: The Visitor of Object Graphs
description: Injecting operations into an untyped object hierarchy.
type: vb
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  ' IVisitor.cls
  Public Sub VisitForm(frm As Object)
  End Sub
  Public Sub VisitControl(ctrl As Object)
  End Sub

  ' CurseInspector.cls
  Implements IVisitor
  Private Sub IVisitor_VisitForm(frm As Object)
      frm.Caption = "Cursed"
  End Sub
  Private Sub IVisitor_VisitControl(ctrl As Object)
      ctrl.Enabled = False
  End Sub
tags: [visitor, inspection, activex]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Visitor traverses disparate components (like Forms and Controls) and executes specialized logic for each type. It cleanly separates the algorithm from the arcane structures it operates on.
