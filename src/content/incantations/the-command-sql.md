---
title: The Command of the Deferred Invocation
description: Encapsulating operations as structured row data for later or asynchronous execution.
type: sql
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Conjuration // Delayed Casting
formula: |
  CREATE TYPE command_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

  -- The Command Queue
  CREATE TABLE invocation_commands (
      command_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      target_entity VARCHAR(100) NOT NULL,
      spell_payload JSONB NOT NULL,
      status command_status DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT NOW()
  );

  -- Enqueueing a Command
  INSERT INTO invocation_commands (target_entity, spell_payload)
  VALUES (
      'NEXUS_CORE', 
      '{"action": "PURGE", "intensity": 9000}'::jsonb
  );

  -- Worker retrieving the next Command (FOR UPDATE SKIP LOCKED)
  SELECT command_id, target_entity, spell_payload
  FROM invocation_commands
  WHERE status = 'PENDING'
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;
tags: [queue, command, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command of the Deferred Invocation

Not all spells should be cast immediately. Some require vast computational rituals and must be deferred. The Command pattern translates actions into state, storing the intent within a **Job Queue** table.

By encapsulating the target and the spell payload (conveniently stored as `JSONB`), we decouple the invocation from the execution. Background daemon mages can later pluck these commands from the ether utilizing `FOR UPDATE SKIP LOCKED` to prevent catastrophic concurrency collisions during processing.
