---
title: The Proxy of the Sealed Vault
description: Controlling access to a powerful artifact via verification conditions.
type: fstar
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Sealing"
formula: |2
  module Proxy
  
  type secret_knowledge = string
  
  let read_grimoire (is_archmage: bool{is_archmage = true}) : secret_knowledge =
    "Forbidden Secrets of the Void"
    
  let proxy_read (user_level: int) : option secret_knowledge =
    if user_level > 9000 then Some (read_grimoire true)
    else None
tags: [proxy, access-control, vaults]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

A Proxy that leverages F*'s dependent types to ensure that only a certified Archmage can invoke the function to read the forbidden grimoire.
