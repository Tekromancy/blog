---
title: "The Command: Encapsulating the Switching Orders"
description: "Binding an action and its parameters into a singular, executable sigil for delayed invocation."
type: chill
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  COMMAND_HEX: MODULE
    GRANT EXECUTE_MACRO, ADD_COMMAND;
    
    NEWMODE CMD_TYPE = SET (OPEN_RELAY, CLOSE_RELAY, REBOOT_NODE);
    NEWMODE COMMAND_T = STRUCT (
      ctype CMD_TYPE,
      target_id INT
    );
    
    DCL macro_queue ARRAY (1:100) COMMAND_T;
    DCL queue_head INT INIT := 0;
    
    ADD_COMMAND: PROCEDURE (c CMD_TYPE, id INT);
      IF queue_head < 100 THEN
        queue_head := queue_head + 1;
        macro_queue(queue_head).ctype := c;
        macro_queue(queue_head).target_id := id;
      FI;
    END ADD_COMMAND;
    
    EXECUTE_MACRO: PROCEDURE ();
      DO FOR i := 1 TO queue_head;
        CASE macro_queue(i).ctype OF
          (OPEN_RELAY):
            /* Open relay logic */
          (CLOSE_RELAY):
            /* Close relay logic */
          (REBOOT_NODE):
            /* Node reboot logic */
        ESAC;
      OD;
      queue_head := 0; /* Clear queue after execution */
    END EXECUTE_MACRO;
  END COMMAND_HEX;
tags: [telecom, chill, command, binding, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command hex encapsulates a request as an object, allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations. In telecom maintenance, a technician rarely alters the matrix in real-time. Instead, they encode their sequence of relay closures and node reboots into a queue of command sigils, to be executed en masse during the sacred maintenance window.
