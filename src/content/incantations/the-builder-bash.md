---
title: The Builder of Data Constructs
description: Incrementally assembling complex Bash parameters through the Builder pattern.
type: script
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Structmancy
formula: |
  #!/usr/bin/env bash
  
  # The Builder State
  declare -A PAYLOAD_BUILDER
  
  reset_builder() {
    PAYLOAD_BUILDER=()
    PAYLOAD_BUILDER[status]="uninitialized"
  }
  
  add_target() {
    PAYLOAD_BUILDER[target]="$1"
  }
  
  add_encryption() {
    PAYLOAD_BUILDER[encryption]="$1"
  }
  
  add_payload() {
    PAYLOAD_BUILDER[payload]="$1"
  }
  
  build_construct() {
    echo "Constructing Cyber-Spell..."
    echo "Target: ${PAYLOAD_BUILDER[target]:-NONE}"
    echo "Encryption: ${PAYLOAD_BUILDER[encryption]:-NONE}"
    echo "Payload: ${PAYLOAD_BUILDER[payload]:-NONE}"
    echo "Cyber-Spell ready for deployment."
  }
  
  # Director
  construct_stealth_virus() {
    reset_builder
    add_target "megacorp.internal.db"
    add_encryption "aes-256-gcm"
    add_payload "drop_tables.sh"
    build_construct
  }
  
  construct_stealth_virus
tags: [bash, builder, creational, structmancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a payload requires intricate assembly, passing a dozen positional arguments to a Bash function becomes an unreadable nightmare. The Builder pattern resolves this by maintaining state within an associative array, allowing the scriptmancer to construct complex invocations step-by-step before finalizing the cast.
