---
title: "The Strategy Hex"
description: "Injecting algorithmic variations into derivation contexts."
type: nix
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # Strategies
    fetchFromGitHub = repo: "Fetching ''${repo} from GitHub using API...";
    fetchFromGitLab = repo: "Fetching ''${repo} from GitLab using tarball...";
    fetchFromLocal = repo: "Copying ''${repo} from local filesystem...";

    # Context
    fetchGrimoire = strategy: repo:
      strategy repo;
  in
  {
    gh = fetchGrimoire fetchFromGitHub "arcane-repo";
    gl = fetchGrimoire fetchFromGitLab "arcane-repo";
  }
tags: [behavioral, strategy, nix, fetchers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Strategy pattern defines a family of algorithms, encapsulating each one. In Nixpkgs, functions like `fetchurl`, `fetchgit`, and `fetchFromGitHub` are distinct strategies that can be passed dynamically into package definitions to resolve sources.
