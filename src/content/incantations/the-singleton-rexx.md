---
title: The Singleton of the Console
description: Ensure a single point of interaction for the mainframe operator console.
type: rexx
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Restriction"
formula: |2
  /* ooRexx Singleton */
  ::class Console private
  ::attribute instance class
  
  ::method getInstance class
    if self~instance = .nil then do
       self~instance = self~new()
    end
    return self~instance
    
  ::method init
    say "Console connection established."
tags: [singleton, console, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The operator console is absolute; there can be only one connection from the orchestrator script to the master control. The Singleton enforces this unbreakable law.
