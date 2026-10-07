---
title: The Strategy
description: Swapping combat algorithms in the eternal Blood War.
type: solidity
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface ICombatStrategy {
      function executeTactic(uint256 enemyForces) external pure returns (string memory);
  }

  contract AggressiveAssault is ICombatStrategy {
      function executeTactic(uint256 enemyForces) external pure override returns (string memory) {
          return "Charge blindly into the fray!";
      }
  }

  contract TacticalRetreat is ICombatStrategy {
      function executeTactic(uint256 enemyForces) external pure override returns (string memory) {
          return "Fall back to the abyssal trenches.";
      }
  }

  contract BloodWarGeneral {
      ICombatStrategy public strategy;

      function setStrategy(address _strategy) external {
          strategy = ICombatStrategy(_strategy);
      }

      function faceEnemy(uint256 enemyForces) external view returns (string memory) {
          return strategy.executeTactic(enemyForces);
      }
  }
tags: [solidity, behavioral, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the eternal Blood War, tactics must adapt to the tides of battle. The Strategy pattern defines a family of combat algorithms as separate smart contracts, allowing the Blood War General to hot-swap tactical algorithms at runtime without redeploying the core command logic.
