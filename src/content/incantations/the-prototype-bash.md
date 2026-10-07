---
title: The Prototype Shell Cloner
description: Duplicating stateful shell configurations via the Prototype pattern.
type: script
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Cloning
formula: |
  #!/usr/bin/env bash
  
  # Prototype base config
  declare -A PROTOTYPE_CONFIG=(
    [timeout]="30"
    [retries]="3"
    [verbosity]="low"
  )
  
  # Clone method
  clone_config() {
    local new_config_name=$1
    # We use declare -n (nameref) to create a copy in a new array
    declare -gA "$new_config_name"
    
    for key in "${!PROTOTYPE_CONFIG[@]}"; do
      eval "$new_config_name[$key]=\"\${PROTOTYPE_CONFIG[$key]}\""
    done
  }
  
  # Usage
  clone_config "HACK_CONFIG"
  HACK_CONFIG[timeout]="10"
  HACK_CONFIG[verbosity]="high"
  
  echo "Prototype Verbosity: ${PROTOTYPE_CONFIG[verbosity]}"
  echo "Cloned Hack Verbosity: ${HACK_CONFIG[verbosity]}"
tags: [bash, prototype, creational, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Why rebuild a complex array of environmental variables when you can simply clone it? The Prototype pattern in Bash leverages the dark art of `eval` and associative arrays to stamp out perfect duplicates of configurations, allowing immediate mutation without altering the original blueprint.
