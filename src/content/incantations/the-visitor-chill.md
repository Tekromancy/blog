---
title: "The Visitor: The Spectral Auditor"
description: "Separating an operation from the object structure on which it operates, allowing new operations without modifying the structures."
type: chill
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // True Seeing"
formula: |2
  VISITOR_HEX: MODULE
    GRANT ACCEPT_VISITOR;
    
    NEWMODE ELEMENT_TYPE = SET (SWITCH_NODE, ROUTER_NODE);
    NEWMODE ELEMENT = STRUCT (
      etype ELEMENT_TYPE,
      id INT,
      config_value INT
    );
    
    /* The Visitor Operations */
    VISIT_SWITCH: PROCEDURE (e REF ELEMENT);
      /* Extract switch telemetry */
    END VISIT_SWITCH;
    
    VISIT_ROUTER: PROCEDURE (e REF ELEMENT);
      /* Inspect router routing tables */
    END VISIT_ROUTER;
    
    /* The Accept Operation */
    ACCEPT_VISITOR: PROCEDURE (e REF ELEMENT);
      IF e->etype = SWITCH_NODE THEN
        VISIT_SWITCH(e);
      ELSIF e->etype = ROUTER_NODE THEN
        VISIT_ROUTER(e);
      FI;
    END ACCEPT_VISITOR;
  END VISITOR_HEX;
tags: [telecom, chill, visitor, true-seeing, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor hex lets you define a new operation without changing the classes of the elements on which it operates. In the vast telecom hierarchy, nodes hold their purpose sacred. When the Spectral Auditors arrive to extract telemetry or verify compliances, they do not rewrite the nodes. Instead, each node implements `ACCEPT_VISITOR`, allowing the external auditor procedures to inspect their internal states cleanly.
