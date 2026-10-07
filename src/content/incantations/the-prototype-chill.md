---
title: "The Prototype: Cloning the Spectral Node"
description: "Duplicating intricate routing matrices without recompiling the arcane source."
type: chill
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Biomancy"
formula: |2
  PROTOTYPE_HEX: MODULE
    GRANT NODE_T, INIT_PROTOTYPE, CLONE_NODE;
    
    NEWMODE NODE_T = STRUCT (
      signature CHAR(16),
      frequency INT,
      matrix_state ARRAY (1:10) INT
    );
    
    DCL master_prototype NODE_T;
    
    INIT_PROTOTYPE: PROCEDURE ();
      master_prototype.signature := 'OMEGA_CORE_00001';
      master_prototype.frequency := 440;
      DO FOR i := 1 TO 10;
        master_prototype.matrix_state(i) := i * 10;
      OD;
    END INIT_PROTOTYPE;
    
    CLONE_NODE: PROCEDURE (new_freq INT) RETURNS (NODE_T);
      DCL clone NODE_T;
      clone := master_prototype; /* Deep copy via structured assignment */
      clone.frequency := new_freq; /* Mutate the clone */
      RETURN clone;
    END CLONE_NODE;
  END PROTOTYPE_HEX;
tags: [telecom, chill, prototype, cloning, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype hex enables the copying of existing spectral nodes without establishing a hard dependency on their intricate initialization rituals. In CHILL, assigning a structured type effectively duplicates its memory footprint, creating a perfect clone of the routing matrix. By cloning the `master_prototype`, telecom magi can rapidly spin up localized routing shards across the cyberpunk network.
