---
title: "The Facade: The Grand Switchboard Console"
description: "Providing a unified, simplistic sigil to orchestrate the chaotic subsystems of the exchange."
type: chill
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  FACADE_HEX: MODULE
    GRANT INITIATE_CALL;
    
    /* Subsystem 1 */
    BILLING_MOD: MODULE
      GRANT CHARGE_ACCOUNT;
      CHARGE_ACCOUNT: PROCEDURE (acct INT, amt INT); END CHARGE_ACCOUNT;
    END BILLING_MOD;
    
    /* Subsystem 2 */
    ROUTING_MOD: MODULE
      GRANT ALLOCATE_PATH;
      ALLOCATE_PATH: PROCEDURE (src INT, dest INT) RETURNS (BOOL); RETURN TRUE; END ALLOCATE_PATH;
    END ROUTING_MOD;
    
    /* Subsystem 3 */
    SIGNALING_MOD: MODULE
      GRANT RING_DESTINATION;
      RING_DESTINATION: PROCEDURE (dest INT); END RING_DESTINATION;
    END SIGNALING_MOD;
    
    /* The Facade */
    INITIATE_CALL: PROCEDURE (caller INT, receiver INT);
      DCL path_found BOOL;
      path_found := ROUTING_MOD.ALLOCATE_PATH(caller, receiver);
      IF path_found THEN
        BILLING_MOD.CHARGE_ACCOUNT(caller, 5);
        SIGNALING_MOD.RING_DESTINATION(receiver);
      FI;
    END INITIATE_CALL;
  END FACADE_HEX;
tags: [telecom, chill, facade, illusion, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Facade hex provides a simplified interface to a complex body of subsystems. Initiating a simple aetheric call involves tangled rituals: path allocation, arcane billing ledgers, and terminal signaling. The Grand Switchboard Console hides this entropy, exposing only `INITIATE_CALL` to the lesser acolytes, shielding them from the maddening complexity of the underlying telecom grimoires.
