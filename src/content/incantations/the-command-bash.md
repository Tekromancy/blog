---
title: The Command Object
description: Encapsulating operations into delayed execution arrays.
type: script
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Conjuration // Delaymancy"
formula: |2
  #!/usr/bin/env bash

  # The Receiver
  firewall_block() { echo "Blocking IP: $1"; }
  firewall_allow() { echo "Allowing IP: $1"; }

  # Command Queue
  declare -a COMMAND_QUEUE

  # Create Commands
  add_command() {
    # Store the exact command string to evaluate later
    COMMAND_QUEUE+=("$*")
  }

  # Invoker
  execute_commands() {
    echo "Executing queued commands..."
    for cmd in "${COMMAND_QUEUE[@]}"; do
      eval "$cmd"
    done
    # Clear queue
    COMMAND_QUEUE=()
  }

  # Client
  add_command "firewall_block 192.168.1.50"
  add_command "firewall_allow 10.0.0.5"

  echo "Commands queued. Sleeping..."
  sleep 1
  execute_commands
tags: [bash, command, behavioral, queues]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A Bash array and the `eval` command are all that is needed to bind action and data into a Command object. By queueing up strings of execution, the scriptmancer can defer heavy operations, run them asynchronously, or build complex transactional rollbacks before committing the final acts.
