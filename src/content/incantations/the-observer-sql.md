---
title: The Observer of the Asynchronous Listeners
description: Broadcasting notifications directly from the database engine to listening clients.
type: sql
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Ethereal Broadcasting
formula: |
  -- The Subject sending the notification
  CREATE OR REPLACE FUNCTION notify_summoning_complete()
  RETURNS TRIGGER AS $$
  BEGIN
      -- Broadcast the payload on the 'summon_events' channel
      PERFORM pg_notify('summon_events', row_to_json(NEW)::text);
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trigger_summon_observer
  AFTER INSERT ON ethereal_constructs
  FOR EACH ROW EXECUTE FUNCTION notify_summoning_complete();

  -- The Observer (Client-side execution)
  -- LISTEN summon_events;
tags: [pubsub, observer, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer of the Asynchronous Listeners

Polling a table every second to check for new rows is an aggressive, wasteful anti-pattern. The database should notify the application. PostgreSQL natively supports the Observer pattern through the **LISTEN / NOTIFY** commands.

When a new construct is summoned, the trigger fires `pg_notify`. Any connected clients that have issued a `LISTEN summon_events` command are instantly pushed the payload over the persistent connection. It is true, asynchronous pub-sub integrated directly into the storage engine.
