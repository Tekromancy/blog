---
title: The Proxy Ward
description: Securing remote actor access.
type: pony
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Remote Binding"
formula: |2
  actor GrimoireProxy
    let _real: Grimoire
    new create(r: Grimoire) => _real = r
    be read_page(n: U32) =>
      if Security.check() then _real.read_page(n) end
tags: [pony, proxy, actor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Proxy Ward

A proxy actor can perform access control or lazy initialization before delegating messages to the true hidden grimoire.
