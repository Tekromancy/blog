---
title: The Composite
description: Assembling fractured souls into a singular demonic hive-mind.
type: solidity
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Necromancy // Amalgamation"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface ISoulEntity {
      function getTormentLevel() external view returns (uint256);
  }

  contract FracturedSoul is ISoulEntity {
      uint256 public torment;
      constructor(uint256 _torment) { torment = _torment; }

      function getTormentLevel() external view override returns (uint256) {
          return torment;
      }
  }

  contract SoulHiveMind is ISoulEntity {
      ISoulEntity[] public souls;

      function addSoul(address _soul) external {
          souls.push(ISoulEntity(_soul));
      }

      function getTormentLevel() external view override returns (uint256) {
          uint256 totalTorment = 0;
          for (uint i = 0; i < souls.length; i++) {
              totalTorment += souls[i].getTormentLevel();
          }
          return totalTorment;
      }
  }
tags: [solidity, structural, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To command a legion is to treat the many as one. The Composite pattern allows an assembly of fractured souls to be treated with the exact same interface as a single soul. The hive-mind aggregates their collective torment seamlessly on the chain.
