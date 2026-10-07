---
title: The Chain of Responsibility (jq)
description: Pass the payload through a gauntlet of filters until one claims dominion over it.
type: jq
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Channeling"
formula: |2
  # Handlers in the chain
  def handle_auth:
    if .type == "auth" then "Handled by Auth Node: \(.user)" else empty end;
    
  def handle_query:
    if .type == "query" then "Handled by Query Node: \(.sql)" else empty end;
    
  def handle_fallback:
    "Unhandled anomaly detected.";

  # The Chain
  def process_chain:
    (handle_auth // handle_query // handle_fallback);

  # Execution
  .events[] | process_chain
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Chain of Responsibility** allows a JSON packet to traverse a sequence of specialized handlers. Utilizing jq's alternative operator (`//`), we string together a gauntlet of nodes. If a handler refuses the payload (yielding `empty`), the stream cascades to the next link in the chain until the query is resolved or captured by the fallback net.
