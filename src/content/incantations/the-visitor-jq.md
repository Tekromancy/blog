---
title: The Visitor (jq)
description: Project an external entity across a heterogeneous JSON matrix to harvest and alter.
type: jq
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Conjuration // Projection"
formula: |2
  # The Visitor function applying operations based on type signatures
  def data_visitor:
    if type == "number" then . * 10
    elif type == "string" then "VISITED: " + .
    elif type == "array" then map(data_visitor)
    elif type == "object" then map_values(data_visitor)
    else . end;

  # Injecting the visitor into the structure
  .heterogeneous_payload | data_visitor
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When a JSON structure is a chimeric beast of strings, arrays, and nested objects, hardcoding modifications is a path to madness. The **Visitor** algorithm traverses the heterogeneous tree. As it encounters each node, it evaluates the elemental type and applies a specific, external logic without ever modifying the underlying structural definitions.
