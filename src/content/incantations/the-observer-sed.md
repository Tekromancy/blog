---
title: The Watchful Eye (Observer)
description: A one-to-many dependency so that when a line changes state, all its dependents are notified.
type: sed
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Observer: Writing to multiple output files or logs upon an event
  /CRITICAL_FAILURE/ {
    # Notify observer 1 (log file)
    w /tmp/critical_log.txt
    # Notify observer 2 (admin alert pipe)
    w /dev/tty
    # Modify the stream as usual
    s/.*/[RESOLVED] &/
  }
tags: [sed, behavioral, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
