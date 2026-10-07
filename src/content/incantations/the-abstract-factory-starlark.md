---
title: The Abstract Factory
description: Conjuring hermetic realms of related build charms.
type: starlark
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Hermetic Charms"
formula: |2
  def _create_cyber_forge():
      return struct(
          forge_weapon = lambda: "Plasma Katana",
          forge_armor = lambda: "Nanotech Weave"
      )
  
  def _create_aether_forge():
      return struct(
          forge_weapon = lambda: "Aetherial Staff",
          forge_armor = lambda: "Mage-Plate"
      )
  
  def get_forge(realm):
      if realm == "cyber":
          return _create_cyber_forge()
      elif realm == "aether":
          return _create_aether_forge()
      fail("Unknown hermetic realm: " + realm)
  
  # Usage
  forge = get_forge("cyber")
  weapon = forge.forge_weapon()
tags: [creational, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the deterministic void of Starlark, where side-effects are banished and execution is pristine, the **Abstract Factory** pattern operates as a realm-selector for your build charms. When weaving massive dependency graphs, one must often switch paradigms—from cybernetic micro-services to aetherial monolithic artifacts—without shattering the underlying hermetic seals. By encapsulating structural creation in `struct` definitions, Starlark mages can ensure that all artifacts conjured are flawlessly compatible with the active realm.
