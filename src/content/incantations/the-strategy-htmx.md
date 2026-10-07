---
title: The Strategy (Dynamic Endpoints)
description: Swapping the algorithm or endpoint an action utilizes based on user selection or context.
type: htmx
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Routing"
formula: |2
  <!-- The user selects the Strategy (the algorithm/endpoint to use) -->
  <select id="attack-strategy" name="strategy">
    <option value="/api/attack/fire">Fireball (AoE)</option>
    <option value="/api/attack/ice">Ice Lance (Piercing)</option>
    <option value="/api/attack/lightning">Chain Lightning (Chaining)</option>
  </select>

  <!-- The execute button dynamically reads the strategy from the select box -->
  <button hx-post="javascript:document.getElementById('attack-strategy').value" 
          hx-target="#battle-log"
          hx-include="#attack-strategy">
    Execute Attack
  </button>
tags: [htmx, strategy, dynamic-routing, forms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Strategy** pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. In a hypermedia context, the algorithm is the backend API endpoint. 

By utilizing dynamic attributes or lightweight JavaScript evaluation, an HTMX command can change its target URI based on user input. The client form provides a selection of attack vectors. The execution button defers the decision of *where* to send the payload until the moment of casting. This allows the behavior of the button to be wildly altered at runtime without changing the structure of the DOM, successfully decoupling the action from the specific implementation of the attack.
