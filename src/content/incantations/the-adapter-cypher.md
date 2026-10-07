---
title: The Adapter Interface Conduit
description: Bridging incompatible node schemas by projecting virtual relationships and standardized views.
type: cypher
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Schema Shifting"
formula: |2
  // Match the legacy systems (the Adaptee)
  MATCH (legacy:LegacyUser)-[:OWNS_DEVICE]->(device:Hardware)
  
  // Project an adapted view aligning with the Modern interface
  WITH legacy, device,
       legacy.user_id AS principal_id,
       legacy.full_name AS display_name,
       device.mac_address AS endpoint_identifier
       
  // Yield the standard projection
  RETURN {
    id: principal_id,
    name: display_name,
    endpoints: collect(endpoint_identifier)
  } AS ModernPrincipalView
tags: [cypher, adapter, structural, projection]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter pattern translates one interface into another that clients expect. In the Neo4j grid, legacy data schemas frequently collide with modern analytics requirements. Instead of expensive, destructive migrations, a query-level adapter can transmute the data on the fly.

Through projections and data mapping within the `WITH` clause, the esoteric and fragmented properties of `LegacyUser` and `Hardware` nodes are bundled and mapped into standard `ModernPrincipalView` outputs. The graph remains untouched, but the application receives the perfectly structured data it requires to cast its spells.
