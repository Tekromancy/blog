---
title: "The Proxy: The Guardian Sentinel"
description: "Providing a surrogate or placeholder to control access to a volatile entity."
type: idris
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access-Control"
formula: |2
  module Proxy
  
  interface GrimoireAccess g where
    readSecret : g -> String
  
  data ForbiddenTome = MkForbiddenTome
  GrimoireAccess ForbiddenTome where
    readSecret _ = "Eldritch Truths Unveiled"
  
  -- The Proxy
  data TomeProxy = MkTomeProxy ForbiddenTome Bool
  
  GrimoireAccess TomeProxy where
    readSecret (MkTomeProxy tome True) = readSecret tome
    readSecret (MkTomeProxy _ False) = "Access Denied: Insufficient Clearance."
tags: [structural, security, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Direct interface with a `ForbiddenTome` risks instantaneous soul-shattering corruption. The Proxy stands as an algorithmic sentinel, intercepting all requests to the prime artifact. Whether verifying security credentials or lazily conjuring the entity only when absolutely necessary, the Proxy enforces the Theorem Proving Pacts at the boundary, keeping the reckless safe from themselves.
