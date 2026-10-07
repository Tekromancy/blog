---
title: The Command of the Hypertext Labyrinth
description: Encapsulate actions as digital payloads that can be queued, delayed, or executed remotely.
type: twine
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Domination"
formula: |2
  :: StoryInit
  <<set $macroQueue to []>>
  
  <<set setup.CommandHack = function(target) {
    return {
      execute: function() { return "Hacking " + target; },
      undo: function() { return "Restoring " + target; }
    }
  }>>
  
  :: Passage
  <<set $payload to setup.CommandHack("Mainframe")>>
  <<run $macroQueue.push($payload)>>
  
  Executing Payload: <<print $macroQueue[0].execute()>>
  Reverting Payload: <<print $macroQueue[0].undo()>>
tags: [behavioral, command, execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the heat of a cyber-run, actions cannot always be taken immediately. The **Command** pattern crystallizes an action—and all its parameters—into a tangible object (the payload).

These encapsulated payloads can be stored in queues, passed between nodes, triggered on a timer, or even reversed entirely. The command object remembers what it was meant to do, waiting silently in the shadows of the `$macroQueue` until the trigger is finally pulled.
