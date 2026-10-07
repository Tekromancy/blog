---
title: The Template Method of the Procedural Skeleton
description: Defining the skeleton of an algorithm in a stored procedure, deferring specific steps to dynamic calls.
type: sql
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Skeletal Invocation
formula: |
  -- The Skeleton Routine
  CREATE OR REPLACE FUNCTION process_ritual_template(
      ritual_id INT, 
      purification_function TEXT
  ) 
  RETURNS BOOLEAN AS $$
  DECLARE
      is_purified BOOLEAN;
  BEGIN
      -- Step 1: Pre-processing (Invariant)
      UPDATE rituals SET status = 'IN_PROGRESS' WHERE id = ritual_id;

      -- Step 2: The Variable Step (The injected hook)
      EXECUTE format('SELECT %I(%s)', purification_function, ritual_id) INTO is_purified;
      
      IF NOT is_purified THEN
          UPDATE rituals SET status = 'FAILED' WHERE id = ritual_id;
          RETURN FALSE;
      END IF;

      -- Step 3: Post-processing (Invariant)
      UPDATE rituals SET status = 'COMPLETED' WHERE id = ritual_id;
      RETURN TRUE;
  END;
  $$ LANGUAGE plpgsql;
tags: [functions, template-method, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method of the Procedural Skeleton

Some rituals follow a strict overarching structure, but one or two internal steps vary wildly depending on the entity being summoned. The Template Method outlines the skeleton.

In PL/pgSQL, this is achieved by writing a core function that handles the invariant pre-processing and post-processing. The variable logic is injected dynamically—passing the name of another function as text, which the skeleton dynamically invokes (`EXECUTE format...`) to handle the specialized, deferred step.
