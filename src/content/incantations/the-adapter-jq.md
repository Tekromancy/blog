---
title: The Adapter (jq)
description: Forcibly align incompatible schema through a localized syntax distortion.
type: jq
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  # The ancient legacy schema
  # { "str_val": "100", "active": "yes" }

  # The adapter filter
  def legacy_to_modern:
    {
      "value": (.str_val | tonumber),
      "is_active": (if .active == "yes" then true else false end)
    };

  # Applying the adapter
  .ancient_records[] | legacy_to_modern
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When archaic systems whisper forgotten JSON dialects, the **Adapter** serves as the universal translator. It maps deprecated fields, casts strings into pure numerics, and transmutes arcane booleans into modern logic, seamlessly binding the old world to the new.
