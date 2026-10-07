---
title: The Decorator Directives
description: Dynamically enchanting schema elements with additional behaviors.
type: graphql
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enchantment"
formula: |2
  # The Decorators (Directives)
  directive @requiresAura(color: String!) on FIELD_DEFINITION
  directive @deprecatedMagic(reason: String = "No longer recommended") on FIELD_DEFINITION | ENUM_VALUE

  type Relic {
    id: ID!
    name: String!
    
    # Decorated fields altering behavior or metadata
    hiddenPower: Int! @requiresAura(color: "PURPLE")
    obsoleteSpell: String @deprecatedMagic(reason: "Replaced by modern enchantments")
  }
tags: [graphql, structural, decorator, directives]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Directives are the native Decorators of the Graph Oracle. They allow you to attach metadata or modify the behavior of types, fields, and arguments without altering the underlying resolver logic, seamlessly layering enchantments like authorization or deprecation.
