---
title: The Mediator Incantation
description: Centralizing complex communications between various elemental spirits.
type: mathematica
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Diplomacy"
formula: |2
  (* The Spirit Nexus (Mediator) *)
  ClearAll[NexusSend, RegisterSpirit];

  $Spirits = <||>;

  RegisterSpirit[name_, element_] := ($Spirits[name] = element);

  NexusSend[from_, to_, message_] := 
    If[KeyExistsQ[$Spirits, to],
      Print["[Nexus] Routing message from ", from, " (", $Spirits[from], ") to ", to, ": ", message],
      Print["[Nexus] Spirit ", to, " not found in the network."]
    ];

  (* Usage *)
  RegisterSpirit["Ignax", "Fire"];
  RegisterSpirit["Aquiel", "Water"];
  RegisterSpirit["Terran", "Earth"];

  NexusSend["Ignax", "Aquiel", "Do not extinguish my flames!"];
  NexusSend["Aquiel", "Terran", "Nourish the roots."];
tags: [mediator, behavioral, centralization, routing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
