---
title: The Proxy
description: Control access to the forbidden cosmic archives.
type: apl
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gateway-Binding"
formula: |2
  :Class AkashicRecord
      ∇ R←Read Secrets
        :Access Public Shared
        R←'Forbidden Knowledge ⍙⍚⍛'
      ∇
  :EndClass

  :Class RealArchive : AkashicRecord
      ∇ R←Read Secrets
        :Access Public
        R←'Unleashing: ', Secrets
      ∇
  :EndClass

  :Class ArchiveProxy : AkashicRecord
      :Field Private RealArc ← ⍬
      :Field Private Clearance

      ∇ Make Lvl
        :Access Public
        :Implements Constructor
        Clearance ← Lvl
      ∇

      ∇ R←Read Secrets
        :Access Public
        :If Clearance ≥ 9
            :If 0=≢RealArc
                RealArc ← ⎕NEW RealArchive
            :EndIf
            R ← RealArc.Read Secrets
        :Else
            R ← 'Access Denied: Insufficient psionic resonance.'
        :EndIf
      ∇
  :EndClass
tags: [apl, structural, alien, proxy, archive]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The `RealArchive` holds truths so immense that they shatter ordinary psychic arrays on contact. The Proxy pattern stands as a sentinel before this cosmic terminal, intercepting requests and validating the caller's psionic clearance level. Only those with profound geometric alignment (level 9 or above) are permitted to trigger the lazy-loading of the archive and witness the alien knowledge (`⍙⍚⍛`).
