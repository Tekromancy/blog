---
title: The Factory Method of Procedural Genesis
description: Stored procedures that abstract the creation pacts of underlying data structures.
type: sql
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Procedural Forging"
formula: |2
  CREATE TYPE construct_class AS ENUM ('GOLEM', 'WISP', 'PHANTOM');

  CREATE TABLE ethereal_constructs (
      construct_id SERIAL PRIMARY KEY,
      class construct_class,
      mana_cost INT
  );

  -- The Factory Method
  CREATE OR REPLACE FUNCTION forge_construct(c_class construct_class) 
  RETURNS INT AS $$
  DECLARE
      c_id INT;
      base_mana INT;
  BEGIN
      IF c_class = 'GOLEM' THEN
          base_mana := 500;
      ELSIF c_class = 'WISP' THEN
          base_mana := 50;
      ELSIF c_class = 'PHANTOM' THEN
          base_mana := 250;
      END IF;

      INSERT INTO ethereal_constructs (class, mana_cost)
      VALUES (c_class, base_mana)
      RETURNING construct_id INTO c_id;

      RETURN c_id;
  END;
  $$ LANGUAGE plpgsql;
tags: [procedures, creational, functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Factory Method of Procedural Genesis

The direct `INSERT` command is a dangerous incantation for apprentices, leaving raw tabular structures exposed to the chaotic aether. The Factory Method obscures these creation pacts within a stored procedure. 

Through conditional routing and internal parameter binding, the `forge_construct` function safely encapsulates the complexities of manifesting varied ethereal forms, returning only the binding identifier (the primary key) to the invoker.
