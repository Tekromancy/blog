---
title: "The State: The Metamorphosis of the Connection"
description: "Altering an object's behavior dynamically as its internal life-cycle state transitions."
type: chill
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  STATE_HEX: MODULE
    GRANT HANDLE_EVENT;
    
    NEWMODE STATE_TYPE = SET (IDLE, DIALING, CONNECTED, DISCONNECTED);
    DCL current_state STATE_TYPE INIT := IDLE;
    
    HANDLE_EVENT: PROCEDURE (event INT);
      CASE current_state OF
        (IDLE):
          IF event = 1 /* Off-hook */ THEN
            current_state := DIALING;
            /* Provide dial tone */
          FI;
        (DIALING):
          IF event = 2 /* Number complete */ THEN
            current_state := CONNECTED;
            /* Establish audio path */
          FI;
        (CONNECTED):
          IF event = 3 /* On-hook */ THEN
            current_state := DISCONNECTED;
            /* Teardown circuit */
          FI;
        (DISCONNECTED):
          /* Wait for cleanup before returning to IDLE */
          current_state := IDLE;
      ESAC;
    END HANDLE_EVENT;
  END STATE_HEX;
tags: [telecom, chill, state, metamorphosis, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The State hex allows an object to alter its behavior when its internal state changes. The lifecycle of a telephone call is a rigid ritual: Idle, Dialing, Connected, Disconnected. A single input, such as hanging up the receiver, means nothing in the Idle state but triggers an immediate circuit teardown in the Connected state. The monolithic `CASE` structure cleanly governs this metamorphosis.
