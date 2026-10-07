---
title: The Memento
description: Capturing and restoring the snapshot of a corrupted soul.
type: solidity
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Restoration
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract SoulMemento {
      uint256 public readonly corruptionLevel;
      string public readonly trueName;

      constructor(uint256 _level, string memory _name) {
          corruptionLevel = _level;
          trueName = _name;
      }
  }

  contract MortalSoul {
      uint256 public corruptionLevel;
      string public trueName;

      function setState(uint256 _level, string memory _name) external {
          corruptionLevel = _level;
          trueName = _name;
      }

      function saveToMemento() external view returns (SoulMemento) {
          return new SoulMemento(corruptionLevel, trueName);
      }

      function restoreFromMemento(address _memento) external {
          SoulMemento m = SoulMemento(_memento);
          corruptionLevel = m.corruptionLevel();
          trueName = m.trueName();
      }
  }
tags: [solidity, behavioral, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the volatile ether of the blockchain, state changes are irreversible. The Memento pattern offers a sliver of chronomancy, taking a snapshot of a soul's state and crystallizing it into a separate contract, allowing for restoration should the corruption grow too rampant.
