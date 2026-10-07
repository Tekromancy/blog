---
title: The Sigil Composite
description: Treat individual runes and complex sigil clusters uniformly in the dependency tree.
type: makefile
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Binding"
formula: |2
  # Leaf nodes (Individual Runes)
  .PHONY: rune_alpha rune_beta rune_gamma
  rune_alpha:
  	@echo "Glowing Alpha..."
  rune_beta:
  	@echo "Glowing Beta..."
  rune_gamma:
  	@echo "Glowing Gamma..."
  
  # Composite nodes (Clusters of Runes)
  .PHONY: cluster_minor cluster_major
  
  cluster_minor: rune_alpha rune_beta
  	@echo "Minor Cluster activated."
  
  cluster_major: cluster_minor rune_gamma
  	@echo "Major Cluster fully illuminated."
  
  # Client interacts with both identically
  .PHONY: invoke_all
  invoke_all: cluster_major
tags: [makefile, structural, composite, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
