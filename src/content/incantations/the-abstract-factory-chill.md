---
title: "The Abstract Factory: Multiplexed Switchboards of the Aether"
description: "Forging divergent telecommunication switchboard components through a singular arcane interface."
type: chill
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Transmutation"
formula: |2
  ABSTRACT_FACTORY_HEX: MODULE
    GRANT MAKE_SWITCH, MAKE_ROUTER, SWITCH_PROC, ROUTER_PROC;
    
    NEWMODE SWITCH_T = STRUCT ( id INT, capacity INT );
    NEWMODE ROUTER_T = STRUCT ( id INT, bandwidth INT );
    
    SWITCH_PROC: PROCEDURE (s SWITCH_T);
      /* Route the signal through the crystal matrix */
    END SWITCH_PROC;
    
    ROUTER_PROC: PROCEDURE (r ROUTER_T);
      /* Direct the packet through the aether streams */
    END ROUTER_PROC;
    
    MAKE_SWITCH: PROCEDURE (id INT, cap INT) RETURNS (SWITCH_T);
      DCL s SWITCH_T;
      s.id := id; s.capacity := cap;
      RETURN s;
    END MAKE_SWITCH;
    
    MAKE_ROUTER: PROCEDURE (id INT, bw INT) RETURNS (ROUTER_T);
      DCL r ROUTER_T;
      r.id := id; r.bandwidth := bw;
      RETURN r;
    END MAKE_ROUTER;
  END ABSTRACT_FACTORY_HEX;
tags: [telecom, chill, conjuration, abstract-factory, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Abstract Factory hex provides an interface for creating families of related or dependent telephonic objects without specifying their concrete crystal types. In the neon-lit depths of the central switching office, a single ritual must be capable of conjuring either an optic-switch or a phased-router without knowing the specific weave of the fiber-optic ley lines.
