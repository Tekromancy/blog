---
title: The Mediator Ward
description: Centralizing communication between independent familiars.
type: pony
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathic Hub"
formula: |2
  actor FamiliarHub
    let _familiars: Array[Familiar] = Array[Familiar]
    be register(f: Familiar) => _familiars.push(f)
    be broadcast(msg: String val) =>
      for f in _familiars.values() do f.notify(msg) end
tags: [pony, mediator, actor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Mediator Ward

A central actor serves as the Mediator, eliminating a chaotic mesh of point-to-point connections among familiars.
