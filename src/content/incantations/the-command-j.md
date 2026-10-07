---
title: "The Command"
description: "Encapsulating a spell cast as a gerund to be executed at a later cosmic alignment."
type: j
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Time Delay"
formula: |2
  strike =: 3 : '''Striking '' , y'
  shield =: 3 : '''Shielding '' , y'
  
  NB. Commands as gerunds (boxed verbs)
  cmd_strike =: strike ` ''
  cmd_shield =: shield ` ''
  
  queue =: cmd_strike , cmd_shield
  
  NB. Execute queue
  execute_all =: 3 : 0
    for_cmd. y do.
      (cmd@.) '' 'Target'
    end.
  )
tags: [command, gerunds, queues, execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Gerunds encapsulate verbs and their arguments, perfectly mirroring the Command pattern in a functional array paradigm.
