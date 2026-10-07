---
title: Proxy in Dhall
description: Guard the execution of sensitive runic evaluation behind conditional checks.
type: dhall
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  let SecureGrimoire = { readSecret : Bool -> Optional Text }
  
  let realGrimoire = \(hasAccess : Bool) -> Some "The Halting Problem is a lie here"
  
  let proxyGrimoire : SecureGrimoire =
        { readSecret =
            \(hasAccess : Bool) ->
              if    hasAccess
              then  realGrimoire hasAccess
              else  None Text
        }
  
  in  proxyGrimoire.readSecret True
tags: [dhall, halting, runes, configuration, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Because Dhall configurations evaluate entirely before deployment, the **Proxy** pattern focuses on logical gating. By wrapping an inner function that contains sensitive or complex resolution logic, the Proxy evaluates credentials or boolean gates first. If the ward rejects the caller, an empty state or `None` is safely returned without evaluating the inner sanctum.
