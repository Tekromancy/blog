---
title: The Factory Method
description: Delegating the instantiation of soul contracts to specialized demon princes.
type: solidity
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Summoning
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface ISoulContract {
      function extract() external returns (string memory);
  }

  contract WrathContract is ISoulContract {
      function extract() external pure override returns (string memory) {
          return "Wrath consumed.";
      }
  }

  contract GreedContract is ISoulContract {
      function extract() external pure override returns (string memory) {
          return "Greed hoarded.";
      }
  }

  abstract contract DemonPrince {
      function summonContract() public virtual returns (ISoulContract);
      
      function executeTithe() public returns (string memory) {
          ISoulContract soulContract = summonContract();
          return soulContract.extract();
      }
  }

  contract PrinceOfWrath is DemonPrince {
      function summonContract() public pure override returns (ISoulContract) {
          return new WrathContract();
      }
  }

  contract PrinceOfGreed is DemonPrince {
      function summonContract() public pure override returns (ISoulContract) {
          return new GreedContract();
      }
  }
tags: [solidity, creational, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Factory Method allows a base contract to define the ritual for summoning, while leaving the exact manifestation of the soul contract to the specialized demon princes. This polymorphism is key when building vast networks of infernal ledgers.
