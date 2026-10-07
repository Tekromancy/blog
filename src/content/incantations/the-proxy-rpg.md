---
title: "Proxy: The Spectral Sentinel"
description: "Provide a surrogate or placeholder to control access to the true Rune."
type: rpg
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Conjuration // Calling"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-S pRealRune Pointer Static Inz(*Null);

  Dcl-Proc InvokeProxy Export;
    Dcl-Pi *N;
    End-Pi;

    // Lazy Initialization of the expensive Rune
    If pRealRune = *Null;
       pRealRune = InitHeavyRune();
    EndIf;

    // Access Control or Logic
    If HasPermission();
       CallRealRune(pRealRune);
    EndIf;
  End-Proc;
tags: [structural, ibm-i, runes, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Proxy

The Proxy pattern guards the threshold to computationally expensive legacy programs. Whether it delays the loading of massive DB2 indexes (Lazy Proxy) or enforces user authorization (Protection Proxy), it wears the face of the true spell but commands the gateway.
