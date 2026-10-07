---
title: The Visitor of the Aggregating Scan
description: Injecting operations that traverse a collection of entities via aggregate functions.
type: sql
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Global Accumulation
formula: |
  CREATE TABLE arcane_nodes (
      node_id SERIAL PRIMARY KEY,
      energy_type VARCHAR(50),
      raw_power INT
  );

  -- The Visitor Concept via Custom Aggregation
  -- Step 1: State Transition Function
  CREATE OR REPLACE FUNCTION accumulate_node_power(state INT, raw_power INT)
  RETURNS INT AS $$
  BEGIN
      -- The visitor logic: custom weighting during accumulation
      RETURN state + (raw_power * 2);
  END;
  $$ LANGUAGE plpgsql;

  -- Step 2: Define the Aggregate (The Visitor)
  CREATE AGGREGATE sum_weighted_power(INT) (
      sfunc = accumulate_node_power,
      stype = INT,
      initcond = '0'
  );

  -- Step 3: Execute the Visitor over the elements
  -- SELECT sum_weighted_power(raw_power) FROM arcane_nodes;
tags: [aggregation, visitor, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Visitor of the Aggregating Scan

How does one apply a custom algorithm to every node in a tabular matrix without mutating the nodes themselves? The Visitor pattern in SQL is most closely aligned with **Custom Aggregate Functions**.

Instead of writing application loops, we define a visitor—a custom transition function (`accumulate_node_power`)—and bind it to an `AGGREGATE`. The database engine then traverses the rows natively, feeding each element into the visitor, which accumulates the state and returns the final synthesized conclusion.
