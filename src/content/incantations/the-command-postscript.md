---
title: "Command in PostScript"
description: "Encapsulate a drawing operation as a macro token to be executed or queued."
type: postscript
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Macro Binding"
formula: |2
  % Command in PostScript
  /DrawMacro <<
    /cmds [
      { (Binding X coordinates...\n) print }
      { (Binding Y coordinates...\n) print }
      { (Applying Stroke\n) print }
    ]
    /execute { dup /cmds get { exec } forall }
  >> def
  
  DrawMacro /execute get exec
tags: [postscript, print-daemon, behavioral, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Command: Macro Encapsulation

The raw incantations of moving and drawing paths can clutter the high-level logic of a spell. By binding these raw executable arrays into a Command dictionary, you encapsulate the action. This macro can then be passed around, stored in an array, or triggered repeatedly by different invocation triggers.
