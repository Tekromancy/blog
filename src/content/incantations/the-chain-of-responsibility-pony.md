---
title: The Chain of Responsibility Ward
description: Passing requests through a gauntlet of wardens.
type: pony
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Sequential Casting"
formula: |2
  actor Warden
    let _next: (Warden | None)
    new create(n: (Warden | None)) => _next = n
    be handle(threat: Threat val) =>
      if can_handle(threat) then dispel(threat)
      else match _next | let nx: Warden => nx.handle(threat) end
      end
tags: [pony, chain-of-responsibility, actor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Chain of Responsibility Ward

Actors linked in a chain pass asynchronous messages along until a Warden capable of handling the specific threat processes it.
