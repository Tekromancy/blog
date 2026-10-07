---
title: The Builder of Snobol
description: Stitching together ancient syllables to construct a complex artifact.
type: snobol
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Golemancy"
formula: |2
          * Builder pattern using string concatenation and replacement
          DEFINE('BUILD_GOLEM()')
          DEFINE('ADD_ARM(G)')
          DEFINE('ADD_HEAD(G)')

          GOLEM = BUILD_GOLEM()
          GOLEM = ADD_ARM(GOLEM)
          GOLEM = ADD_HEAD(GOLEM)
          OUTPUT = GOLEM
          :(END)

  BUILD_GOLEM
          BUILD_GOLEM = 'Clay Body' :(RETURN)

  ADD_ARM
          ADD_ARM = G ', Stone Arm' :(RETURN)

  ADD_HEAD
          ADD_HEAD = G ', Iron Head' :(RETURN)
  END
tags: [snobol, strings, creational, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder pattern in SNOBOL is achieved through successive string concatenations and substitutions. The golem is built piece by piece, as each incantation adds another structural component to the text representation.
