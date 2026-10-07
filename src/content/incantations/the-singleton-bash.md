---
title: The Singleton Mutex Lock
description: Ensuring absolute uniqueness in the daemon realm using Singleton via file locks.
type: script
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Mutexmancy"
formula: |2
  #!/usr/bin/env bash

  LOCK_FILE="/tmp/cyber_singleton.lock"

  acquire_singleton() {
    # Using 'noclobber' to ensure atomic file creation
    if ( set -o noclobber; echo "$$" > "$LOCK_FILE" ) 2> /dev/null; then
      trap 'rm -f "$LOCK_FILE"; exit $?' INT TERM EXIT
      echo "Singleton lock acquired by PID $$."
    else
      echo "Failed to acquire Singleton. Another instance is active."
      exit 1
    fi
  }

  # Main
  acquire_singleton

  echo "Executing high-risk unique operation..."
  sleep 2
  echo "Operation complete."
tags: [bash, singleton, creational, lock]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the chaotic multi-process ecosystem of a UNIX shell, true singletons are forged through file locks. By using atomic operations like `set -o noclobber`, the scriptmancer ensures that only one instance of the spell can hold the conduit open, preventing race conditions from tearing the fabric of the filesystem.
