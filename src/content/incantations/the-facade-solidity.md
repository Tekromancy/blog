---
title: The Facade
description: A monolithic obsidian gate hiding a labyrinth of infernal sub-contracts.
type: solidity
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Obfuscation"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract SoulHarvester {
      function reap() external pure returns (uint256) { return 1; }
  }

  contract LedgerKeeper {
      function recordReap(uint256 souls) external pure returns (bool) { return true; }
  }

  contract AetherFurnace {
      function burn(uint256 souls) external pure returns (uint256) { return souls * 10; }
  }

  contract ObsidianGateFacade {
      SoulHarvester public harvester;
      LedgerKeeper public keeper;
      AetherFurnace public furnace;

      constructor() {
          harvester = new SoulHarvester();
          keeper = new LedgerKeeper();
          furnace = new AetherFurnace();
      }

      function executeGrandRitual() external returns (uint256) {
          uint256 souls = harvester.reap();
          keeper.recordReap(souls);
          return furnace.burn(souls);
      }
  }
tags: [solidity, structural, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Obsidian Gate serves as the Facade, hiding the intricate, horrifying complexity of the infernal subsystems. Rather than calling multiple contracts to reap, record, and burn souls, the warlock simply invokes the grand ritual upon the gate.
