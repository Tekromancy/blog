---
title: "The Factory Method: Spawning the Daemon Processes"
description: "Delegating the instantiations of telephonic sub-routines to specialized summoning circles."
type: chill
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  FACTORY_METHOD_HEX: MODULE
    GRANT SPAWN_HANDLER;
    
    NEWMODE HANDLER_TYPE = SET (VOICE, DATA, TELEX);
    NEWMODE HANDLER_ID = INT;
    
    DCL next_id HANDLER_ID INIT := 0;
    
    SPAWN_HANDLER: PROCEDURE (htype HANDLER_TYPE) RETURNS (HANDLER_ID);
      next_id := next_id + 1;
      CASE htype OF
        (VOICE):
          /* Summon a voice circuit daemon */
          START VOICE_PROCESS(next_id);
        (DATA):
          /* Summon a packet switching daemon */
          START DATA_PROCESS(next_id);
        (TELEX):
          /* Summon a legacy telex daemon */
          START TELEX_PROCESS(next_id);
      ESAC;
      RETURN next_id;
    END SPAWN_HANDLER;
    
    VOICE_PROCESS: PROCESS (id HANDLER_ID);
      /* Voice handling logic */
    END VOICE_PROCESS;
    
    DATA_PROCESS: PROCESS (id HANDLER_ID);
      /* Data handling logic */
    END DATA_PROCESS;
    
    TELEX_PROCESS: PROCESS (id HANDLER_ID);
      /* Telex handling logic */
    END TELEX_PROCESS;
  END FACTORY_METHOD_HEX;
tags: [telecom, chill, factory-method, summoning, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Factory Method hex defines an interface for creating a handler daemon, but leaves the choice of the specific sub-routine to the invoking circle. In the sprawling telephonic grids, whether a request is for voice, data, or archaic telex, the central scheduler simply invokes `SPAWN_HANDLER`. The factory translates the request into the appropriate daemon process, weaving its soul into the tele-matrix.
