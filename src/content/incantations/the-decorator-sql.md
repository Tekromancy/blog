---
title: The Decorator of the Triggered Veil
description: Dynamically attaching behaviors and metadata without altering the core entity.
type: sql
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Illusion // Metamagic Triggers"
formula: |2
  CREATE TABLE spell_registry (
      spell_id SERIAL PRIMARY KEY,
      spell_name TEXT NOT NULL,
      updated_at TIMESTAMP
  );

  -- The Decorator Function
  CREATE OR REPLACE FUNCTION set_update_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- Binding the Decorator
  CREATE TRIGGER trigger_decorate_spell_update
  BEFORE UPDATE ON spell_registry
  FOR EACH ROW
  EXECUTE FUNCTION set_update_timestamp();
tags: [triggers, decorator, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator of the Triggered Veil

To alter the fundamental columns of an ancient table is to risk breaking a thousand dependent scripts. Instead, we use the Decorator pattern—manifested via database **Triggers**—to invisibly wrap our entities with new behavior.

The `set_update_timestamp` function intercepts the mutation just before it hits the disk, decorating the incoming payload with temporal precision. The caller knows nothing of this modification; the magic happens seamlessly in the background.
