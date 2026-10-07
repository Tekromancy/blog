---
title: "The Mediator: The Central Clearinghouse"
description: "Restricting direct communications between complex subsystems by forcing all signals through a central nexus."
type: chill
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Domination"
formula: |2
  MEDIATOR_HEX: MODULE
    GRANT NOTIFY_MEDIATOR;
    
    /* Subsystems */
    NEWMODE COMP_TYPE = SET (SWITCH_A, SWITCH_B, ALARM_SYS);
    
    NOTIFY_MEDIATOR: PROCEDURE (sender COMP_TYPE, event INT);
      CASE sender OF
        (SWITCH_A):
          IF event = 1 THEN /* Switch A Overloaded */
            /* Divert traffic to Switch B */
            /* Activate Alarm Sys */
          FI;
        (SWITCH_B):
          /* Handle Switch B events */
        (ALARM_SYS):
          /* Handle Alarm events */
      ESAC;
    END NOTIFY_MEDIATOR;
  END MEDIATOR_HEX;
tags: [telecom, chill, mediator, domination, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator hex reduces chaotic dependencies between communicating objects. If every switch, router, and alarm in the central office communicated directly with one another, the network topology would devolve into a mad, tangled web of spaghetti connections. The Central Clearinghouse dictates that all entities must pass their events to the `NOTIFY_MEDIATOR` procedure, cleanly orchestrating the complex interactions from a single vantage point.
