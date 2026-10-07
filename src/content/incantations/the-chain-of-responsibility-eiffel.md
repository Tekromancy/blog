---
title: "The Chain of Responsibility Leyline"
description: "Passing requests through a sequence of warding nodes."
type: eiffel
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
formula: |2
  deferred class
      WARD_NODE

  feature
      next_node: WARD_NODE

      set_next (node: WARD_NODE)
          do
              next_node := node
          ensure
              next_set: next_node = node
          end

      handle_intrusion (threat_level: INTEGER)
          do
              if can_handle (threat_level) then
                  neutralize
              elseif next_node /= Void then
                  next_node.handle_intrusion (threat_level)
              end
          end

      can_handle (threat_level: INTEGER): BOOLEAN
          deferred
          end

      neutralize
          deferred
          end
  end
tags: [behavioral, chain-of-responsibility, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Incoming arcane threats are handed down a chain of progressively stronger wards, decoupling the threat from its ultimate neutralizing node.
