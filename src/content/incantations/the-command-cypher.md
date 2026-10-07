---
title: The Command Scroll
description: Encapsulating a request as an object (node) to support queuing, logging, and deferred execution.
type: cypher
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Deferred Invocation"
formula: |2
  // Create a deferred command node (The Scroll)
  CREATE (cmd:CommandTask {
    id: randomUUID(),
    action: 'TRANSFER_FUNDS',
    payload: '{"from": "AccA", "to": "AccB", "amount": 500}',
    status: 'QUEUED',
    created_at: timestamp()
  })
  
  // Bind the command to its invoker
  WITH cmd
  MATCH (invoker:SystemProcess {name: 'FinancialDaemon'})
  MERGE (invoker)-[:HAS_QUEUED]->(cmd)
  
  // Later execution by a cron process (separate transaction):
  // MATCH (cmd:CommandTask {status: 'QUEUED'})
  // WITH cmd LIMIT 1
  // SET cmd.status = 'EXECUTING' ...
  
  RETURN cmd.id AS CommandScrollID
tags: [cypher, command, behavioral, async, queues]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command pattern encapsulates a request as an object, allowing you to parameterize clients, queue requests, and support undo operations. In graph architecture, we manifest this as a `CommandTask` node.

Instead of executing a complex mutation immediately, a mage inscribes the parameters and the action into a "Scroll" (the Command node). This scroll is then linked into a queue for a background daemon to process asynchronously. By reifying the action into a node, we gain a perfect audit trail and the ability to reverse-engineer fizzled spells.
