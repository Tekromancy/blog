---
title: "The Visitor Astral Projection"
description: "Walking a tree of elements to perform operations externally."
type: eiffel
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Soul-Walking"
formula: |2
  deferred class
      ASTRAL_VISITOR

  feature
      visit_fire_node (f: FIRE_NODE)
          deferred
          end

      visit_ice_node (i: ICE_NODE)
          deferred
          end
  end

  deferred class
      ELEMENT_NODE

  feature
      accept (v: ASTRAL_VISITOR)
          deferred
          end
  end
tags: [behavioral, visitor, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Astral Visitor projects itself through the nodes of an elemental matrix, extracting or altering data without tainting the original node's structure.
