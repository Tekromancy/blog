---
title: The Mediator Pattern in VBA
description: Centralize the chaotic communication between userform controls, preventing them from strangling one another.
type: vba
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Spreadsheet Necromancy"
formula: |2
  ' Interface: IMediator (Class Module)
  Public Sub Notify(sender As Object, eventCode As String)
  End Sub
  
  ' Class: UserFormMediator (Class Module)
  Implements IMediator
  Private pBtnCast As Object ' CommandButton
  Private pTxtMana As Object ' TextBox
  
  Public Sub Init(btn As Object, txt As Object)
      Set pBtnCast = btn
      Set pTxtMana = txt
  End Sub
  
  Private Sub IMediator_Notify(sender As Object, eventCode As String)
      If eventCode = "ManaChanged" Then
          If Val(pTxtMana.Text) > 10 Then
              pBtnCast.Enabled = True
          Else
              pBtnCast.Enabled = False
          End If
      End If
  End Sub
  
  ' Inside UserForm code
  ' Private pMediator As New UserFormMediator
  ' Private Sub txtMana_Change()
  '     pMediator.Notify txtMana, "ManaChanged"
  ' End Sub
tags: [vba, mediator, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator: The Arch-Cultist

VBA UserForms often descend into madness. A checkbox changes, which disables a textbox, which triggers an event that hides a listbox. When controls reference each other directly, the form becomes an inescapable web of cyclic dependencies.

The Mediator acts as the Arch-Cultist. No control is allowed to speak to another control directly. Instead, when a control mutates, it notifies the Mediator. The Mediator contains the grand design, deciding which controls to enable, disable, or curse based on the incoming event. It restores central authority to your chaotic UI.
