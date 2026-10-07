---
title: "The Abstract Factory Hex"
description: "A pure environment conjuration that groups related derivation enchantments."
type: nix
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Pure Environment Hexes"
formula: |2
  { pkgs ? import <nixpkgs> {} }:

  let
    # The Abstract Factory Interface (represented as a set of functions)
    createLinuxEnv = {
      mkCompiler = pkgs.gcc;
      mkDebugger = pkgs.gdb;
    };

    createWindowsEnv = {
      mkCompiler = pkgs.mingwW64;
      mkDebugger = null; # Not natively supported in this hex
    };

    # Client code that uses the factory
    buildArcaneArtifact = factory:
      pkgs.stdenv.mkDerivation {
        name = "arcane-artifact";
        src = ./.;
        buildInputs = [ factory.mkCompiler ] ++ pkgs.lib.optional (factory.mkDebugger != null) factory.mkDebugger;
        buildPhase = ''
          echo "Forging artifact with pure hermetic seals..."
        '';
      };

  in
  {
    linuxArtifact = buildArcaneArtifact createLinuxEnv;
    windowsArtifact = buildArcaneArtifact createWindowsEnv;
  }
tags: [creational, nix, environment, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory in Nix is naturally expressed as attribute sets containing families of related derivations or functions. By passing the factory into the client builder, we ensure hermetic purity and cross-platform alchemy.
