---
title: "The Template Method Ritual"
description: "Defining the skeleton of a spell, deferring steps to subclasses."
type: eiffel
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritualism"
formula: |2
  deferred class
      BASE_RITUAL

  feature -- Template Method
      perform_ritual
          do
              draw_circle
              chant_words
              ignite
          end

  feature {NONE} -- Steps
      draw_circle
          deferred
          end

      chant_words
          deferred
          end

      ignite
          do
              -- Default spark
          end
  end
tags: [behavioral, template-method, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Template Method secures the unchangeable skeleton of a ritual, while allowing apprentice mages to substitute specific incantations safely.
