---
title: The Proxy (jq)
description: Intercept and guard the flow of JSON to forbidden or expensive operations.
type: jq
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Shielding"
formula: |2
  # The expensive or sensitive operation
  def nuke_database:
    "DATABASE OBLITERATED";

  # The Proxy shield
  def secure_proxy($user_role):
    if $user_role == "root_archmage" then
      nuke_database
    else
      "ACCESS DENIED: Insufficient arcane clearance."
    end;

  # Execution
  .commands[] | secure_proxy(.caller_role)
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Not all nodes in the stream are worthy of executing reality-altering spells. The **Proxy** stands as a sentinel before the core logic. By intercepting the request, the proxy evaluates the credentials or conditions within the JSON payload, deflecting unauthorized invocations and ensuring the safety of the wider system.
