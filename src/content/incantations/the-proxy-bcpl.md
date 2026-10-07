---
title: The Proxy of the Watcher
description: Control access to ancient, power-hungry void monoliths via a vigilant sentinel.
type: bcpl
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Sentinel"
formula: |2
  GET "libhdr"

  // The Real Subject
  LET AwakenMonolith() BE $(
    writef("The Ancient Monolith awakens, consuming vast energy!*n")
  $)

  // The Proxy
  LET AccessMonolith(credentials) BE $(
    IF credentials = 42 THEN $(
      writef("Watcher: Access granted. Proceed with caution.*n")
      AwakenMonolith()
    $) ELSE $(
      writef("Watcher: Access denied. You are not worthy.*n")
    $)
  $)

  LET START() BE $(
    writef("Attempting access with invalid sigil...*n")
    AccessMonolith(13)

    writef("Attempting access with prime sigil...*n")
    AccessMonolith(42)
  $)
tags: [proxy, sentinel, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
