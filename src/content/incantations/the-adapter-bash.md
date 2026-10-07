---
title: The Adapter of Legacy Streams
description: Translating ancient text formats into modern cyber-structures.
type: script
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Streammancy
formula: |
  #!/usr/bin/env bash
  
  # The Target Interface (Modern JSON Processor)
  process_json() {
    echo "Processing JSON data: $1"
  }
  
  # The Adaptee (Legacy CSV output)
  legacy_get_user() {
    echo "id,name,role"
    echo "101,Neo,Hacker"
  }
  
  # The Adapter
  csv_to_json_adapter() {
    local csv_data
    csv_data=$(legacy_get_user | tail -n +2)
    
    # Primitive parsing via IFS
    IFS=',' read -r id name role <<< "$csv_data"
    
    local json_data="{\"id\":\"$id\", \"name\":\"$name\", \"role\":\"$role\"}"
    process_json "$json_data"
  }
  
  csv_to_json_adapter
tags: [bash, adapter, structural, text-processing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Not all data flows in pure formats. The Adapter pattern bridges the gap between obsolete standard outputs and modern data ingests. By wrapping legacy commands and using `awk`, `sed`, or simple shell parsing, we convert archaic CSV runes into the structured JSON spellwork expected by modern APIs.
