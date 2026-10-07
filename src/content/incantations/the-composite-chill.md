---
title: "The Composite: The Fractal Switch Hierarchy"
description: "Treating individual relay nodes and massive switching clusters with uniform reverence."
type: chill
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Geometry"
formula: |2
  COMPOSITE_HEX: MODULE
    GRANT EXECUTE_NODE, NODE_T, ADD_CHILD;
    
    NEWMODE NODE_TYPE = SET (LEAF, CLUSTER);
    
    NEWMODE NODE_T = STRUCT (
      ntype NODE_TYPE,
      id INT,
      children ARRAY (1:10) REF NODE_T,
      child_count INT
    );
    
    EXECUTE_NODE: PROCEDURE (n REF NODE_T);
      IF n->ntype = LEAF THEN
        /* Process single relay */
      ELSIF n->ntype = CLUSTER THEN
        /* Iterate through all child nodes */
        DO FOR i := 1 TO n->child_count;
          EXECUTE_NODE(n->children(i));
        OD;
      FI;
    END EXECUTE_NODE;
    
    ADD_CHILD: PROCEDURE (parent REF NODE_T, child REF NODE_T);
      IF parent->ntype = CLUSTER AND parent->child_count < 10 THEN
        parent->child_count := parent->child_count + 1;
        parent->children(parent->child_count) := child;
      FI;
    END ADD_CHILD;
  END COMPOSITE_HEX;
tags: [telecom, chill, composite, geometry, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Composite hex allows clients to treat individual objects and compositions of objects uniformly. The telecom grid is fractal: a single relay switch operates identically to a macroscopic switching cluster that houses a thousand relays. By defining a tree structure where branches and leaves share the `EXECUTE_NODE` invocation, the grid orchestrator can trigger cascades of data routing with a single command.
