---
title: The Composite of the Recursive Hierarchy
description: Treating individual rows and collections of rows uniformly via recursive structures.
type: sql
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Divination // Fractal Tracing
formula: |
  -- Self-referential table
  CREATE TABLE coven_hierarchy (
      member_id SERIAL PRIMARY KEY,
      moniker VARCHAR(100),
      mentor_id INT REFERENCES coven_hierarchy(member_id)
  );

  -- Recursive CTE executing the Composite traversal
  WITH RECURSIVE lineage AS (
      -- Base case: The Archmage
      SELECT member_id, moniker, mentor_id, 1 as rank
      FROM coven_hierarchy
      WHERE mentor_id IS NULL
      
      UNION ALL
      
      -- Recursive step: Apprentices
      SELECT c.member_id, c.moniker, c.mentor_id, l.rank + 1
      FROM coven_hierarchy c
      INNER JOIN lineage l ON c.mentor_id = l.member_id
  )
  SELECT * FROM lineage ORDER BY rank;
tags: [recursive, composite, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite of the Recursive Hierarchy

How do you query a tree where the depth is unknown? The Composite pattern allows us to treat a single mage and a complex coven lineage through the exact same interface.

Using PostgreSQL's `WITH RECURSIVE` invocation, we recursively traverse the self-referencing bindings. The initial query isolates the root node, and the subsequent recursion loops through the relational pacts, flattening an endless fractal into a clean tabular response.
