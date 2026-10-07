---
title: "The Memento: Temporal Checkpoints"
description: "Halt and save the dimensional shift records of a loop."
type: futhark
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  type memento = { step: i32, energy: i32 }
  
  let save_state (s: i32) (e: i32) = { step = s, energy = e }
  
  let restore_state (m: memento) = (m.step, m.energy)
tags: [futhark, memento, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
