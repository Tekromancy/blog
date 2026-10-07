---
title: "The Singleton: The Central Axis Core"
description: "Ensuring a solitary, universally accessible nexus point for all aetheric routing requests."
type: chill
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Warding"
formula: |2
  SINGLETON_HEX: MODULE
    GRANT GET_AXIS_STATE, SET_AXIS_STATE;
    
    /* The REGION construct ensures mutually exclusive access */
    AXIS_CORE: REGION
      GRANT READ_STATE, WRITE_STATE;
      
      DCL global_routing_state INT INIT := 0;
      
      READ_STATE: PROCEDURE () RETURNS (INT);
        RETURN global_routing_state;
      END READ_STATE;
      
      WRITE_STATE: PROCEDURE (new_state INT);
        global_routing_state := new_state;
      END WRITE_STATE;
    END AXIS_CORE;
    
    GET_AXIS_STATE: PROCEDURE () RETURNS (INT);
      RETURN READ_STATE();
    END GET_AXIS_STATE;
    
    SET_AXIS_STATE: PROCEDURE (new_state INT);
      WRITE_STATE(new_state);
    END SET_AXIS_STATE;
  END SINGLETON_HEX;
tags: [telecom, chill, singleton, abjuration, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton hex dictates that a class or module holds only a single, universally accessed instance. In CHILL, this is elegantly achieved through the `REGION` construct, an arcane ward that encapsulates state and guarantees mutually exclusive access by concurrent daemons. The Central Axis Core remains singular and pristine, unaffected by the chaotic storms of concurrent telecom threads.
