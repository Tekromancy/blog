---
title: The State of the Transition Matrix
description: Managing entity behavior based on explicit state machines within the schema.
type: sql
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  CREATE TYPE quest_state AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'FAILED');

  CREATE TABLE cyber_quests (
      quest_id SERIAL PRIMARY KEY,
      title VARCHAR(200),
      current_state quest_state DEFAULT 'DRAFT'
  );

  -- State Transition Guard
  CREATE OR REPLACE FUNCTION validate_quest_transition()
  RETURNS TRIGGER AS $$
  BEGIN
      -- Cannot move backwards from Completed
      IF OLD.current_state = 'COMPLETED' THEN
          RAISE EXCEPTION 'A completed quest cannot shift state.';
      END IF;

      -- Draft can only go to Active
      IF OLD.current_state = 'DRAFT' AND NEW.current_state NOT IN ('DRAFT', 'ACTIVE') THEN
          RAISE EXCEPTION 'Invalid transition from DRAFT.';
      END IF;

      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trigger_quest_state_guard
  BEFORE UPDATE ON cyber_quests
  FOR EACH ROW EXECUTE FUNCTION validate_quest_transition();
tags: [state-machine, behavioral, triggers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State of the Transition Matrix

Entities in a database rarely remain static; their lifecycles pass through distinct phases. The State pattern is encoded using **Enums and Transition Guards**.

By strictly defining the allowed phases via an `ENUM`, and writing a trigger that intercepts `UPDATE` calls, we enforce a rigid Finite State Machine directly at the database layer. Applications cannot bypass these rules; the logic governing the transitions is universally enforced by the engine itself.
