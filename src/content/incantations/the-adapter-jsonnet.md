---
title: The Adapter of Jsonnet
description: Translating one data schema into another.
type: jsonnet
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Schema Shifting"
formula: |2
  local OldSystemData = {
    user_id: 123,
    full_name: "John Doe"
  };

  local Adapter(oldData) = {
    id: oldData.user_id,
    firstName: std.split(oldData.full_name, " ")[0],
    lastName: std.split(oldData.full_name, " ")[1]
  };

  {
    modern_system: Adapter(OldSystemData)
  }
tags: [structural, adapter, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Adapter acts as a magical translator, reshaping an archaic data layout into a modern schema, ensuring compatibility between disparate systems.
