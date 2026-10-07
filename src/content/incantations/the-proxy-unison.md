---
title: The Proxy
description: Provide a surrogate or placeholder for another arcane entity to control access to it.
type: unison
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  ability ForbiddenKnowledge where
    readScroll : Text -> Text
    
  -- The Proxy is a handler that checks authorization before delegating.
  guardedVault : Boolean -> '{ForbiddenKnowledge} a -> Optional a
  guardedVault isArchmage comp =
    h : Request ForbiddenKnowledge a -> Optional a
    h = cases
      {ForbiddenKnowledge.readScroll t -> resume} ->
        if isArchmage then handle resume (t ++ " - true text") with h
        else None
      {a} -> Some a
    handle !comp with h
tags: [structural, proxy, unison, abilities, authorization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In Unison, a Proxy is elegantly implemented using Abilities. A spell that requires access to a restricted scroll simply requests the `readScroll` ability. The Proxy takes the form of an effect handler (`guardedVault`) that intercepts this request, verifies the caster's credentials, and either fulfills the request by consulting the true text, or denies it by aborting the evaluation.
