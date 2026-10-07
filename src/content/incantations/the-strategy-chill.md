---
title: "The Strategy: Swapping the Routing Paradigms"
description: "Encapsulating distinct algorithmic families to make them interchangeable at runtime."
type: chill
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  STRATEGY_HEX: MODULE
    GRANT SET_STRATEGY, ROUTE_PACKET;
    
    NEWMODE STRATEGY_TYPE = SET (SHORTEST_PATH, LEAST_COST, MAX_SECURITY);
    DCL active_strategy STRATEGY_TYPE INIT := SHORTEST_PATH;
    
    SET_STRATEGY: PROCEDURE (s STRATEGY_TYPE);
      active_strategy := s;
    END SET_STRATEGY;
    
    ROUTE_PACKET: PROCEDURE (payload CHAR(50));
      CASE active_strategy OF
        (SHORTEST_PATH):
          /* Calculate lowest hop count */
        (LEAST_COST):
          /* Avoid high-tariff copper lines */
        (MAX_SECURITY):
          /* Route through encrypted fiber-optic tunnels */
      ESAC;
    END ROUTE_PACKET;
  END STRATEGY_HEX;
tags: [telecom, chill, strategy, tactics, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy hex defines a family of algorithms, encapsulates each one, and makes them interchangeable. When navigating the datasphere, the optimal path changes based on shifting corporate alliances. During peace, the `LEAST_COST` strategy governs the routers. During a cyber-war, an overseer invokes `SET_STRATEGY` to `MAX_SECURITY`, immediately altering the decision matrix of the network without halting the flow of packets.
