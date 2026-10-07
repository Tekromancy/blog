---
title: "The Template Method: The Skeleton of the Protocol"
description: "Defining the invariant skeleton of an algorithm while deferring specific steps to lesser rituals."
type: chill
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Skeleton"
formula: |2
  TEMPLATE_METHOD_HEX: MODULE
    GRANT ESTABLISH_LINK;
    
    /* The Template Method */
    ESTABLISH_LINK: PROCEDURE (link_type INT);
      AUTHENTICATE();
      IF link_type = 1 THEN
        CONFIGURE_SATELLITE();
      ELSE
        CONFIGURE_FIBER();
      FI;
      FINALIZE_CONNECTION();
    END ESTABLISH_LINK;
    
    /* Invariant Steps */
    AUTHENTICATE: PROCEDURE ();
      /* Handshake and crypt-key exchange */
    END AUTHENTICATE;
    
    FINALIZE_CONNECTION: PROCEDURE ();
      /* Write to billing ledger */
    END FINALIZE_CONNECTION;
    
    /* Variant Steps */
    CONFIGURE_SATELLITE: PROCEDURE ();
      /* Align orbital dishes */
    END CONFIGURE_SATELLITE;
    
    CONFIGURE_FIBER: PROCEDURE ();
      /* Tune laser frequencies */
    END CONFIGURE_FIBER;
  END TEMPLATE_METHOD_HEX;
tags: [telecom, chill, template-method, skeleton, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method hex defines the skeleton of an algorithm in an operation, deferring some steps to variant branches. Setting up a secure telecom link always requires authentication and final billing, regardless of the medium. The `ESTABLISH_LINK` procedure enforces this rigid skeleton. Only the specific physical configuration steps—tuning orbital dishes versus fiber lasers—are conditionally altered based on the requested medium.
