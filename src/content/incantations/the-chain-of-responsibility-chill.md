---
title: "The Chain of Responsibility: Cascading the Fault Signals"
description: "Passing error alarms along a chain of overseers until a handler intercepts the anomaly."
type: chill
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Prophecy"
formula: |2
  CHAIN_OF_RESPONSIBILITY_HEX: MODULE
    GRANT HANDLE_ALARM;
    
    NEWMODE ALARM_LEVEL = SET (MINOR, MAJOR, CRITICAL);
    
    /* Handlers */
    LOCAL_TECHNICIAN: PROCEDURE (level ALARM_LEVEL) RETURNS (BOOL);
      IF level = MINOR THEN
        /* Handle minor jitter */
        RETURN TRUE;
      FI;
      RETURN FALSE;
    END LOCAL_TECHNICIAN;
    
    REGIONAL_OVERSEER: PROCEDURE (level ALARM_LEVEL) RETURNS (BOOL);
      IF level = MAJOR THEN
        /* Handle trunk failure */
        RETURN TRUE;
      FI;
      RETURN FALSE;
    END REGIONAL_OVERSEER;
    
    ARCHMAGE_OF_THE_GRID: PROCEDURE (level ALARM_LEVEL) RETURNS (BOOL);
      IF level = CRITICAL THEN
        /* Handle core meltdown */
        RETURN TRUE;
      FI;
      RETURN FALSE;
    END ARCHMAGE_OF_THE_GRID;
    
    /* The Chain */
    HANDLE_ALARM: PROCEDURE (level ALARM_LEVEL);
      IF NOT LOCAL_TECHNICIAN(level) THEN
        IF NOT REGIONAL_OVERSEER(level) THEN
          IF NOT ARCHMAGE_OF_THE_GRID(level) THEN
            /* Unhandled Alarm: The Grid falls */
          FI;
        FI;
      FI;
    END HANDLE_ALARM;
  END CHAIN_OF_RESPONSIBILITY_HEX;
tags: [telecom, chill, chain-of-responsibility, divination, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility hex passes requests along a chain of handlers. Upon detecting an anomaly in the aether-streams, a fault signal is generated. It first whispers to the local technician constructs. If the fault is beyond their capacity, the signal cascades upward to the regional overseers, and finally to the Archmage of the Grid. The sender is decoupled from the specific receiver, allowing dynamic fault tolerance.
