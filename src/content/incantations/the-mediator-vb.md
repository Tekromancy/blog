---
title: The Mediator of the Form Global
description: Centralizing event hell between a dozen interlocking ActiveX controls.
type: vb
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  ' FrmMainMediator.frm
  ' This form acts as the mediator

  Private Sub cmdAction_Click()
      ' Coordinate the other controls
      txtStatus.Text = "Ritual Begun"
      picAltar.BackColor = vbRed
  End Sub

  Public Sub Notify(sender As String, evt As String)
      If sender = "DemonControl" And evt = "Awoken" Then
          txtStatus.Text = "Containment Breach"
      End If
  End Sub
tags: [mediator, forms, activex]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When ActiveX controls communicate directly with one another, a tangled web of events emerges. The Mediator (usually a central Form) swallows these events, acting as the sole orchestrator of the chaos.
