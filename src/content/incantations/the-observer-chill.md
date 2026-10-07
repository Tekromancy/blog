---
title: "The Observer: Subscribing to the Aether-Vibrations"
description: "Establishing a one-to-many dependency so that when a core state changes, all watchers are notified."
type: chill
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  OBSERVER_HEX: MODULE
    GRANT ATTACH, DETACH, NOTIFY_ALL, SET_STATE;
    
    NEWMODE OBSERVER_ID = INT;
    DCL observers ARRAY (1:20) OBSERVER_ID;
    DCL observer_count INT INIT := 0;
    
    DCL subject_state INT INIT := 0;
    
    ATTACH: PROCEDURE (id OBSERVER_ID);
      IF observer_count < 20 THEN
        observer_count := observer_count + 1;
        observers(observer_count) := id;
      FI;
    END ATTACH;
    
    NOTIFY_ALL: PROCEDURE ();
      DO FOR i := 1 TO observer_count;
        /* Send SIGNAL to observer process with subject_state */
        SEND UPDATE_SIGNAL(subject_state) TO observers(i);
      OD;
    END NOTIFY_ALL;
    
    SET_STATE: PROCEDURE (new_state INT);
      subject_state := new_state;
      NOTIFY_ALL();
    END SET_STATE;
  END OBSERVER_HEX;
tags: [telecom, chill, observer, telepathy, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer hex defines a subscription mechanism to notify multiple entities of any state changes. In telecom systems, monitoring tools, billing engines, and alarm boards all need to know when a massive trunk line fails. Instead of polling the trunk incessantly, these daemons `ATTACH` themselves as observers. When the line's state fractures, the trunk invokes `NOTIFY_ALL`, transmitting the catastrophic news across the aether via telepathic CHILL signals.
