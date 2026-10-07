---
title: "The Iterator Dowsing Rod"
description: "Traversing collections of magical artifacts sequentially."
type: eiffel
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Dowsing"
formula: |2
  deferred class
      ARTIFACT_ITERATOR [G]

  feature
      item: G
          deferred
          end

      forth
          deferred
          end

      after: BOOLEAN
          deferred
          end
  end
tags: [behavioral, iterator, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using an Iterator, one can scan through a vault of artifacts blindly, relying on strict contracts to prevent exceeding the bounds of the collection.
