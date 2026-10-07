---
title: "The Proxy: The Tollgate Sentinel"
description: "Controlling access to the forbidden core routers through a surrogate entity."
type: chill
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  PROXY_HEX: MODULE
    GRANT ACCESS_ROUTER;
    
    /* The Real Subject */
    CORE_ROUTER: MODULE
      GRANT EXECUTE_COMMAND;
      EXECUTE_COMMAND: PROCEDURE (cmd CHAR(50));
        /* Directly manipulates the core matrix */
      END EXECUTE_COMMAND;
    END CORE_ROUTER;
    
    /* The Proxy */
    ACCESS_ROUTER: PROCEDURE (user_clearance INT, cmd CHAR(50));
      IF user_clearance >= 9 THEN
        /* Access Granted: Pass through to Real Subject */
        CORE_ROUTER.EXECUTE_COMMAND(cmd);
      ELSE
        /* Access Denied */
        /* Log security violation to the inquisitors */
      FI;
    END ACCESS_ROUTER;
  END PROXY_HEX;
tags: [telecom, chill, proxy, gatekeeping, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy hex acts as a surrogate or placeholder to control access to another object. The innermost core routers of the telecom guild are highly volatile; untethered access can cause cascading reality failures. The Tollgate Sentinel sits before the core, intercepting all commands, verifying the arcane clearance level of the user, and either relaying the command or triggering the alarm hexes.
