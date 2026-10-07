---
title: The Decorator Attribute Grafting
description: Dynamically attaching additional responsibilities and tags to a node without altering its base structure.
type: cypher
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Grafting"
formula: |2
  // Identify the core target node
  MATCH (avatar:Avatar {id: $avatarId})
  
  // Attach a decorative feature: applying a new label and setting temporary properties
  CALL apoc.create.addLabels(avatar, ['Stealthed', 'Enhanced']) YIELD node AS decoratedAvatar
  SET decoratedAvatar.stealth_duration = $duration,
      decoratedAvatar.power_boost = 15
      
  // Optionally, link a modifier node as a structural decorator
  MERGE (mod:Modifier {type: 'InvisibilityCloak'})
  MERGE (decoratedAvatar)-[eq:EQUIPS]->(mod)
  ON CREATE SET eq.timestamp = timestamp()
  
  RETURN decoratedAvatar, mod
tags: [cypher, decorator, structural, labels, dynamic-modification]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator pattern dynamically attaches additional responsibilities to an object. In Cypher, this is accomplished through the fluid grafting of labels and the injection of structural modifiers via relationships.

By utilizing `apoc.create.addLabels`, a cyber-mage can temporarily enchant an `Avatar` node with new behaviors (labels like `Stealthed`), effectively decorating the base entity. Further, we can attach `Modifier` nodes, wrapping the core avatar in a shell of extended functionality without altering its fundamental schema.
