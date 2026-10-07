---
title: The Visitor of Snobol
description: A spectral entity examining components of an AST without changing them.
type: snobol
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral Projection"
formula: |2
          * Visitor Pattern in SNOBOL4
          DEFINE('VISIT_NODE(NODE_TYPE, VISITOR_FUNC)')

          VISIT_NODE('MONSTER', 'SCAN_WEAKNESS')
          VISIT_NODE('TREASURE', 'SCAN_VALUE')
          :(END)

  VISIT_NODE
          EVAL(VISITOR_FUNC '(NODE_TYPE)') :(RETURN)

  SCAN_WEAKNESS
          OUTPUT = 'Scanning MONSTER for vulnerabilities...' :(RETURN)

  SCAN_VALUE
          OUTPUT = 'Appraising TREASURE worth...' :(RETURN)
  END
tags: [snobol, behavioral, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor acts as an astral projection, leaving the physical structure of an object intact while performing external operations upon it. SNOBOL achieves this decoupling by dispatching dynamically via `EVAL`.
