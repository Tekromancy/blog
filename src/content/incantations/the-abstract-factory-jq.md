---
title: The Abstract Factory (jq)
description: Forge ethereal arrays and necrotic objects through higher-order transmutation nodes.
type: jq
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Transmutation"
formula: |2
  # Define the ethereal and necrotic transmutation registries
  def ethereal_factory:
    {
      "create_weapon": { "type": "energy_blade", "damage": "plasma" },
      "create_armor": { "type": "light_shield", "defense": "photonic" }
    };
  def necrotic_factory:
    {
      "create_weapon": { "type": "bone_scythe", "damage": "void" },
      "create_armor": { "type": "shadow_cloak", "defense": "entropic" }
    };

  # Abstract constructor based on environment trait
  def abstract_factory($realm):
    if $realm == "ethereal" then ethereal_factory
    elif $realm == "necrotic" then necrotic_factory
    else empty end;

  # Summoning the structures
  abstract_factory("ethereal") | .create_weapon
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the shifting datascapes, the **Abstract Factory** operates as a meta-constructor—a nexus that binds JSON entities to specific realms of existence. By channeling the stream through a realm discriminator, we yield complete sets of harmonious data structures without hardcoding their cybernetic lineage.
