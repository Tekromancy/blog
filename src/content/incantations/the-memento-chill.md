---
title: "The Memento: Capturing the State of the Matrix"
description: "Externalizing an object's internal state to allow restoration without breaking encapsulation wards."
type: chill
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Preservation"
formula: |2
  MEMENTO_HEX: MODULE
    GRANT SAVE_STATE, RESTORE_STATE;
    
    NEWMODE MEMENTO_T = STRUCT (
      active_connections INT,
      power_level INT
    );
    
    DCL current_connections INT INIT := 0;
    DCL current_power INT INIT := 100;
    
    SAVE_STATE: PROCEDURE () RETURNS (MEMENTO_T);
      DCL m MEMENTO_T;
      m.active_connections := current_connections;
      m.power_level := current_power;
      RETURN m;
    END SAVE_STATE;
    
    RESTORE_STATE: PROCEDURE (m MEMENTO_T);
      current_connections := m.active_connections;
      current_power := m.power_level;
    END RESTORE_STATE;
  END MEMENTO_HEX;
tags: [telecom, chill, memento, preservation, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Memento hex captures and externalizes an object's internal state so that it can be restored later. Before embarking on hazardous maintenance within the core matrix, a wise operator extracts a crystal memento using `SAVE_STATE`. Should the upgrade unleash chaotic daemons, the operator can simply invoke `RESTORE_STATE`, rewinding the entity to its preserved, uncorrupted form without penetrating its private data wards.
