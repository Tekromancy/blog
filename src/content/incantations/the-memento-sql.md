---
title: The Memento of the Temporal Ledger
description: Capturing and preserving internal state for historical restoration.
type: sql
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  CREATE TABLE artifact_inventory (
      artifact_id INT PRIMARY KEY,
      power_level INT,
      owner_id INT
  );

  -- The Memento Archive
  CREATE TABLE artifact_history (
      history_id SERIAL PRIMARY KEY,
      artifact_id INT,
      power_level INT,
      owner_id INT,
      snapshot_timestamp TIMESTAMP DEFAULT NOW()
  );

  -- Trigger to capture the Memento
  CREATE OR REPLACE FUNCTION capture_artifact_memento()
  RETURNS TRIGGER AS $$
  BEGIN
      INSERT INTO artifact_history (artifact_id, power_level, owner_id)
      VALUES (OLD.artifact_id, OLD.power_level, OLD.owner_id);
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trigger_artifact_snapshot
  BEFORE UPDATE ON artifact_inventory
  FOR EACH ROW EXECUTE FUNCTION capture_artifact_memento();
tags: [audit, memento, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento of the Temporal Ledger

Mistakes happen. A malicious query or an accidental update can overwrite precious state. The Memento pattern is realized in databases via **Audit Tables** or **History Ledgers**.

Through a `BEFORE UPDATE` trigger, the exact state of the `OLD` row is captured and sealed into `artifact_history` before the mutation occurs. This provides a perfect snapshot of previous states, allowing chronomancers to restore the database to an exact point in the past.
