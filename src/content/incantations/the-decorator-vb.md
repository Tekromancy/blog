---
title: The Decorator of Intercepted Calls
description: Dynamically attaching new curses to an object without altering its DLL.
type: vb
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  ' ISpell.cls
  Public Sub Cast()
  End Sub

  ' BaseSpell.cls
  Implements ISpell
  Private Sub ISpell_Cast()
      MsgBox "A spark appears."
  End Sub

  ' CursedDecorator.cls
  Implements ISpell
  Private m_spell As ISpell

  Public Sub Init(s As ISpell)
      Set m_spell = s
  End Sub

  Private Sub ISpell_Cast()
      On Error Resume Next
      ' Add the curse
      MsgBox "The spark turns black."
      m_spell.Cast
  End Sub
tags: [decorator, intercept, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Modifying an existing COM DLL breaks binary compatibility and plunges you into DLL Hell. The Decorator dynamically wraps objects, augmenting their behaviors with new darkness safely.
