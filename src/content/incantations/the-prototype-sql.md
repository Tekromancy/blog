---
title: The Prototype of the Doppelganger Rows
description: Cloning entities and table structures through exact magical replication.
type: sql
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  -- Structural Cloning (Table Prototype)
  CREATE TABLE shadow_grimoire (
      LIKE ancient_grimoire INCLUDING ALL
  );

  -- Entity Cloning (Row Prototype)
  CREATE OR REPLACE FUNCTION clone_demon_pact(pact_id UUID) 
  RETURNS UUID AS $$
  DECLARE
      new_pact_id UUID := gen_random_uuid();
  BEGIN
      INSERT INTO demon_pacts (id, demon_name, soul_cost, terms)
      SELECT new_pact_id, demon_name, soul_cost, terms
      FROM demon_pacts
      WHERE id = pact_id;

      RETURN new_pact_id;
  END;
  $$ LANGUAGE plpgsql;
tags: [clone, copy, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Prototype of the Doppelganger Rows

In the relational abyss, creating from scratch is costly. The Prototype pattern thrives as a mechanism of replication. Whether we are cloning the very fabric of a table (`LIKE ... INCLUDING ALL`) or duplicating an existing demonic contract via `INSERT INTO ... SELECT`, we achieve seamless replication.

This spell duplicates exact state without the overhead of re-invoking complex initiation rites, allowing the immediate deployment of shadow copies and experimental test subjects.
