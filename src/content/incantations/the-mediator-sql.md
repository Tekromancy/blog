---
title: The Mediator of the Event Bus
description: Centralizing communication between decoupled tables via triggers and logging.
type: sql
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Hub Routing"
formula: |2
  CREATE TABLE system_event_bus (
      event_id SERIAL PRIMARY KEY,
      source_table VARCHAR(50),
      event_type VARCHAR(50),
      payload JSONB,
      logged_at TIMESTAMP DEFAULT NOW()
  );

  -- The Mediator Function
  CREATE OR REPLACE FUNCTION broadcast_to_bus()
  RETURNS TRIGGER AS $$
  BEGIN
      INSERT INTO system_event_bus (source_table, event_type, payload)
      VALUES (
          TG_TABLE_NAME, 
          TG_OP, 
          row_to_json(NEW)::jsonb
      );
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- Entities binding to the Mediator rather than each other
  CREATE TRIGGER trigger_mage_events
  AFTER INSERT OR UPDATE ON cyber_mages
  FOR EACH ROW EXECUTE FUNCTION broadcast_to_bus();
tags: [event-bus, mediator, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator of the Event Bus

When an insertion into `cyber_mages` needs to notify five different logging, auditing, and analytics tables, coupling them via direct triggers creates a chaotic web of dependencies.

The `system_event_bus` acts as the **Mediator**. The core entities know only of the event bus, blindly sending their state changes to it. External systems or separate workers then poll or listen to the mediator, cleanly decoupling the sender from the various receivers.
