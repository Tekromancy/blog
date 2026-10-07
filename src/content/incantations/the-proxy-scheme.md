---
title: The Proxy
description: Controlling access to forbidden grimoires through intermediary spirits.
type: scheme
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Banishment"
formula: |2
  (define (read-forbidden-grimoire)
    "Eldritch secrets revealed.")

  (define (make-grimoire-proxy true-name-known?)
    (lambda ()
      (if true-name-known?
          (read-forbidden-grimoire)
          "Access denied by the guardian spirit.")))

  (define proxy (make-grimoire-proxy #f))
  (proxy)
tags: [structural, scheme, access-control, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Closures trap the original invocation, allowing an intermediary logic to enforce constraints before the ancient powers are released.
