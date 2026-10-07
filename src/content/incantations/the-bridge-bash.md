---
title: The Bridge of Execution Contexts
description: Decoupling the command logic from the execution environment.
type: script
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Evocation // Contextmancy
formula: |
  #!/usr/bin/env bash
  
  # Implementation interface
  exec_local() {
    eval "$1"
  }
  
  exec_remote() {
    local target=$1
    local cmd=$2
    echo "ssh $target \"$cmd\""
    # mock ssh execution
  }
  
  # Abstraction
  run_diagnostic() {
    local execution_method=$1
    local target=$2
    local command="df -h && free -m"
    
    if [[ "$execution_method" == "local" ]]; then
      exec_local "$command"
    elif [[ "$execution_method" == "remote" ]]; then
      exec_remote "$target" "$command"
    fi
  }
  
  # Client
  echo "--- Local Diagnostic ---"
  run_diagnostic "local" ""
  
  echo "--- Remote Diagnostic ---"
  run_diagnostic "remote" "cyber-server-01"
tags: [bash, bridge, structural, execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern decouples an abstraction from its implementation, allowing both to vary independently. In Bash, this manifests as separating *what* script logic is run from *where* and *how* it runs—be it local evaluation, distant SSH tunneling, or containerized execution via Docker exec.
