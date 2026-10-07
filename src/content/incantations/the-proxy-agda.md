---
title: "The Proxy Sentinel"
description: "A placeholder or surrogate to control access to another object."
type: agda
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Control"
formula: |2
  module ProxyPattern where
  
  open import Data.String
  open import Data.Bool
  
  record Vault : Set where
    field accessData : String
    
  realVault : Vault
  realVault = record { accessData = "Secret Codes" }
  
  proxyVault : Bool → Vault
  proxyVault true = realVault
  proxyVault false = record { accessData = "Access Denied" }
tags: ["agda", "proxy", "security"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy Sentinel

Before letting an unknown daemon access the main neural core, we put a **Proxy Sentinel** in front. It looks identical to the real target, but intercepts calls for caching, authorization, or lazy evaluation.

## The Dependent Runes

We parameterize the proxy by authentication tokens. With Dependent Types, we can even demand a formal Proof of Authorization (`AccessLevel User ≡ Admin`) before the compiler will even allow the function to return the real vault.
