---
title: "The Builder: Assembling the Crystal Relay"
description: "Constructing complex telecommunication packet relays step-by-step through ritualized incantations."
type: chill
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  BUILDER_HEX: MODULE
    GRANT CONSTRUCT_RELAY, ADD_CRYSTAL, ADD_AMPLIFIER, FINISH_RELAY, RELAY_T;
    
    NEWMODE RELAY_T = STRUCT (
      crystals INT,
      amplifiers INT,
      is_active BOOL
    );
    
    DCL current_relay RELAY_T;
    
    CONSTRUCT_RELAY: PROCEDURE ();
      current_relay.crystals := 0;
      current_relay.amplifiers := 0;
      current_relay.is_active := FALSE;
    END CONSTRUCT_RELAY;
    
    ADD_CRYSTAL: PROCEDURE ();
      current_relay.crystals := current_relay.crystals + 1;
    END ADD_CRYSTAL;
    
    ADD_AMPLIFIER: PROCEDURE ();
      current_relay.amplifiers := current_relay.amplifiers + 1;
    END ADD_AMPLIFIER;
    
    FINISH_RELAY: PROCEDURE () RETURNS (RELAY_T);
      current_relay.is_active := TRUE;
      RETURN current_relay;
    END FINISH_RELAY;
  END BUILDER_HEX;
tags: [telecom, chill, builder, artifice, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder hex allows you to construct complex telecommunication packet relays step by step. When weaving the strands of a fiber-optic nexus, the process requires an ordered invocation: binding the quartz crystals, attuning the aether amplifiers, and finally sealing the structure. This separation of construction and representation ensures the same ritual can yield varying configurations of relays.
