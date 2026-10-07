---
title: The Proxy
description: A spectral ward that intercepts access to a forbidden artifact.
type: assembly
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Necromancy // Ward Enforcement"
formula: |2
  section .data
      access_granted db 0

  section .text
      global access_artifact

  real_artifact_access:
      ; The true dark artifact operation
      ret

  access_artifact:
      ; The Proxy check
      cmp byte [access_granted], 1
      jne .denied

      call real_artifact_access
      ret

  .denied:
      ; Trigger a curse or trap
      ret
tags: [proxy, assembly, structural, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy pattern places an interceptor before the true logic. In Assembly, this acts as a demonic ward, checking authorization flags or deferring expensive initializations before granting access to the raw, unbridled power of the core artifact.
