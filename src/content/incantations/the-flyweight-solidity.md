---
title: The Flyweight
description: Conserving gas by sharing the intrinsic essence of a thousand lesser demons.
type: solidity
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Transmutation // Efficiency
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract DemonEssence {
      // Intrinsic state shared among many demons
      string public species;
      uint256 public basePower;

      constructor(string memory _species, uint256 _basePower) {
          species = _species;
          basePower = _basePower;
      }
  }

  contract LegionCamp {
      mapping(string => address) public essences;

      function getEssence(string memory _species, uint256 _basePower) public returns (address) {
          if (essences[_species] == address(0)) {
              DemonEssence newEssence = new DemonEssence(_species, _basePower);
              essences[_species] = address(newEssence);
          }
          return essences[_species];
      }
  }

  contract LesserDemon {
      address public essence; // Shared state
      uint256 public coordinateX; // Extrinsic state
      uint256 public coordinateY; // Extrinsic state

      constructor(address _essence, uint256 _x, uint256 _y) {
          essence = _essence;
          coordinateX = _x;
          coordinateY = _y;
      }
  }
tags: [solidity, structural, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When fielding a vast legion of demons on a gas-constrained ledger, storing duplicate data is a fool's errand. The Flyweight pattern extracts the shared intrinsic essence of the demonic species into a single contract, heavily optimizing storage costs.
