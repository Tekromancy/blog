---
title: The Mediator
description: A central monolithic altar coordinating chaotic demonic factions.
type: solidity
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Orchestration
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface IAltarMediator {
      function notify(address sender, string memory eventCode) external;
  }

  contract DemonicFaction {
      IAltarMediator public altar;

      constructor(address _altar) {
          altar = IAltarMediator(_altar);
      }

      function declareWar() external {
          altar.notify(address(this), "WAR_DECLARED");
      }

      function receiveCommand(string memory command) external pure {
          // Act on command
      }
  }

  contract ObsidianAltar is IAltarMediator {
      DemonicFaction public factionA;
      DemonicFaction public factionB;

      function setFactions(address _a, address _b) external {
          factionA = DemonicFaction(_a);
          factionB = DemonicFaction(_b);
      }

      function notify(address sender, string memory eventCode) external override {
          if (keccak256(abi.encodePacked(eventCode)) == keccak256(abi.encodePacked("WAR_DECLARED"))) {
              if (sender == address(factionA)) {
                  factionB.receiveCommand("DEFEND");
              } else {
                  factionA.receiveCommand("DEFEND");
              }
          }
      }
  }
tags: [solidity, behavioral, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than allowing demonic factions to communicate directly and embroil the ledger in chaotic spaghetti-code warfare, the Mediator acts as the central Obsidian Altar. All events are whispered to the altar, which then routes the grim commands to the appropriate cohorts.
