---
title: "The Composite Hex Tree"
description: "Treating individual hexes and complex curses uniformly."
type: eiffel
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  deferred class
      MAGIC_COMPONENT

  feature -- Operations

      trigger
          deferred
          end
  end

  class
      COMPOSITE_CURSE

  inherit
      MAGIC_COMPONENT

  create
      make

  feature -- Initialization
      make
          do
              create children.make_empty
          end

  feature -- Access
      children: ARRAYED_LIST [MAGIC_COMPONENT]

      add_hex (h: MAGIC_COMPONENT)
          require
              hex_exists: h /= Void
          do
              children.extend (h)
          end

      trigger
          do
              across children as c loop
                  c.item.trigger
              end
          end
  end
tags: [structural, composite, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Composite pattern lets you build a sprawling tree of curses, where an entire branch can be triggered as easily as a single cantrip.
