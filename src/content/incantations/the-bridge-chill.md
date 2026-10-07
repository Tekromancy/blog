---
title: "The Bridge: Severing the Protocol from the Medium"
description: "Decoupling the abstract routing logic from its physical transmission vectors."
type: chill
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Spatial"
formula: |2
  BRIDGE_HEX: MODULE
    GRANT SEND_MESSAGE;
    
    NEWMODE MEDIUM_TYPE = SET (FIBER, COPPER, AETHER);
    
    /* The Implementation Interface */
    TRANSMIT: PROCEDURE (msg CHAR(255), medium MEDIUM_TYPE);
      CASE medium OF
        (FIBER):
          /* Flash pulses of light */
        (COPPER):
          /* Modulate electrical currents */
        (AETHER):
          /* Ripple the astral plane */
      ESAC;
    END TRANSMIT;
    
    /* The Abstraction Interface */
    SEND_MESSAGE: PROCEDURE (msg CHAR(255), priority INT, m MEDIUM_TYPE);
      DCL formatted_msg CHAR(255);
      IF priority > 5 THEN
        formatted_msg := 'URGENT: ' // msg;
      ELSE
        formatted_msg := 'NORMAL: ' // msg;
      FI;
      
      /* Delegate to the physical medium */
      TRANSMIT(formatted_msg, m);
    END SEND_MESSAGE;
  END BRIDGE_HEX;
tags: [telecom, chill, bridge, transmutation, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge hex separates an abstraction from its implementation, allowing both to evolve independently. In the grand telecom exchanges, the logic of message prioritization and formatting is kept distinct from the physical realities of fiber, copper, or aetheric transmission. This decoupling ensures that when a new astral plane is discovered, the high-level routing logic requires no alterations.
