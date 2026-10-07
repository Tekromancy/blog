---
title: The Proxy
description: Controlling access to the forbidden Vault of Souls via a surrogate guardian.
type: mumps
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Ward-Binding"
formula: |2
  PROXY ; Proxy Pattern in MUMPS
  ;
  ACCESSVAULT(USER) ; Proxy function
    I $$CHECKPERMS(USER) D
    . W "Access granted to Vault.",!
    . D REALACCESS()
    E  D
    . W "Access DENIED. Incinerating user...",!
    Q
  ;
  CHECKPERMS(USER) ;
    I USER="ARCHMAGE" Q 1
    Q 0
  ;
  REALACCESS ;
    W "Displaying forbidden soul records...",!
    ; (Read from protected ^VAULT)
    Q
tags: [structural, proxy, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
