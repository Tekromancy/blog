---
title: The Visitor of the Data Structures
description: Externalizing logic from the component hierarchy using a Visitor function.
type: script
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Visitmancy
formula: |
  #!/usr/bin/env bash
  
  # The Elements
  file_node() { echo "FILE:$1:$2"; }  # name:size
  dir_node() { echo "DIR:$1:$2"; }    # name:child_count
  
  # The Visitor
  audit_visitor() {
    local type=$1
    local name=$2
    local meta=$3
    
    if [[ "$type" == "FILE" ]]; then
      if (( meta > 1000 )); then
        echo "Audit: $name is unusually large ($meta bytes)."
      else
        echo "Audit: $name is normal size."
      fi
    elif [[ "$type" == "DIR" ]]; then
      echo "Audit: $name contains $meta children. Inspecting..."
    fi
  }
  
  # The Accept Method (Iterator)
  accept_visitor() {
    local visitor_func=$1
    # Read stream of nodes
    while IFS=':' read -r type name meta; do
      # Pass data to the visitor
      $visitor_func "$type" "$name" "$meta"
    done
  }
  
  # Usage
  {
    file_node "passwd" 1500
    file_node "config.sh" 500
    dir_node "secrets" 5
  } | accept_visitor "audit_visitor"
tags: [bash, visitor, behavioral, inspection]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Visitor pattern separates an algorithm from the object structure on which it operates. In Bash pipelines, structural data is often streamed as formatted strings. The `accept` mechanism pipes these structures to an external Visitor function, which dynamically inspects the metadata and performs arbitrary logic without modifying the source functions.
