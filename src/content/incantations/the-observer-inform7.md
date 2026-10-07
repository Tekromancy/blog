---
title: The Observer
description: A constellation of familiars that instantly react when the archmage's protective aura fluctuates.
type: inform7
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Prose-Based Spellcasting"
formula: |2
  The archmage aura is a thing. The archmage aura has a text called the aura state. The aura state is "stable".
  
  A watcher familiar is a kind of animal.
  The raven is a watcher familiar. The owl is a watcher familiar.
  
  To change the aura state to (new state - a text):
      now the aura state of the archmage aura is new state;
      say "The archmage's aura shifts to [new state]!";
      notify the familiars.
      
  To notify the familiars:
      repeat with the watcher running through the watcher familiars:
          say "[The watcher] caws frantically, reacting to the aura shift!"
tags: [behavioral, divination, observer, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
