---
title: "The Builder Ritual"
description: "Step-by-step construction of complex summoning rituals."
type: eiffel
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Ritualism"
formula: |2
  deferred class
      RITUAL_BUILDER

  feature -- Construction

      build_base_circle
          deferred
          end

      add_runes
          deferred
          end

      get_ritual: RITUAL
          deferred
          ensure
              ritual_ready: Result /= Void
          end

  end
tags: [creational, builder, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By utilizing a Builder, a magus can construct a highly intricate summoning ritual step-by-step, ensuring every rune and circle requirement is fulfilled before the final invocation.
