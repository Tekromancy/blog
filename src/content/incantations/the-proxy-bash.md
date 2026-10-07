---
title: The Proxy of Access Control
description: Intercepting dangerous command executions through a permission-aware Proxy.
type: script
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Gatekeeping
formula: |
  #!/usr/bin/env bash
  
  # Real Subject
  wipe_drive() {
    echo "WIPING SECURE DRIVE... ALL DATA LOST."
  }
  
  # The Proxy
  secure_wipe_drive() {
    local user=$1
    if [[ "$user" == "root" || "$user" == "admin" ]]; then
      echo "Proxy: Access granted. Executing."
      wipe_drive
    else
      echo "Proxy: Access Denied! $user does not have clearance."
    fi
  }
  
  # Usage
  secure_wipe_drive "guest"
  secure_wipe_drive "admin"
tags: [bash, proxy, structural, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Direct access to powerful incantations often ends in disaster. A Proxy acts as a protective shell around a sensitive script function. Whether enforcing user privileges, validating parameters, or logging access attempts, the Proxy stands between the client and the raw destructive power of the system.
