---
title: "The Command: Encapsulated Annihilation"
description: "Turning a request into a stand-alone object containing all information about the request."
type: "arnoldc"
gofPattern: "Command"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Triggers"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY RECEIVER_BOMB
  GIVE THESE PEOPLE AIR
  TALK TO THE HAND "BOOM. Sector destroyed."
  I'LL BE BACK 1
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY COMMAND_EXECUTE
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE TARGET_ID
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY
  
  TALK TO THE HAND "Executing command on target:"
  TALK TO THE HAND TARGET_ID
  
  GET YOUR ASS TO MARS DUMMY
  DO IT NOW RECEIVER_BOMB
  
  I'LL BE BACK 0
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE INVOKER_STORED_TARGET
  GET TO THE CHOPPER INVOKER_STORED_TARGET
  HERE IS MY INVITATION 99
  ENOUGH TALK
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE DUMMY_VAR
  
  TALK TO THE HAND "Invoker holding the command. Pressing the button now..."
  
  GET YOUR ASS TO MARS DUMMY_VAR
  DO IT NOW COMMAND_EXECUTE INVOKER_STORED_TARGET
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "command", "arnoldc", "triggers"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Apprentice"
---

# The Command: Encapsulated Annihilation

A button on a Warlord's console does not know how the missile works, it only knows that pushing it invokes the apocalypse. The Command pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

In ArnoldC, we wrap the raw receiver subroutine (`RECEIVER_BOMB`) inside a command wrapper (`COMMAND_EXECUTE`). The invoker simply stores the parameters and triggers the execution, cleanly separating the intent from the violent outcome.
