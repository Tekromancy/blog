---
title: The Proxy Incantation
description: Intercepting and controlling access to a powerful elemental entity.
type: clojure
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  (ns tekromancy.proxy)

  (defprotocol Grimoire
    (read-secret [_ user]))

  (defrecord ForbiddenGrimoire []
    Grimoire
    (read-secret [_ _]
      "The forbidden true name of the void..."))

  (defrecord GrimoireProxy [real-grimoire]
    Grimoire
    (read-secret [_ user]
      (if (= user :archmage)
        (read-secret real-grimoire user)
        "Access Denied. You lack the clearance.")))

  ;; Usage:
  ;; (def protected-grimoire (->GrimoireProxy (->ForbiddenGrimoire)))
  ;; (read-secret protected-grimoire :apprentice)
tags: [structural, proxy, clojure, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Direct access to the Forbidden Grimoire will incinerate an apprentice's mind. The Proxy stands as a guardian ward, intercepting requests and validating the caster's aura before delegating the invocation to the true object, shielding the fragile psyche of the uninitiated.
