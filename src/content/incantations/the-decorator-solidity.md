---
title: The Decorator
description: Layering curses upon an existing geas without altering its core essence.
type: solidity
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Layering"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface IGeas {
      function getPotency() external view returns (uint256);
  }

  contract BaseGeas is IGeas {
      function getPotency() external pure override returns (uint256) {
          return 100;
      }
  }

  abstract contract GeasModifier is IGeas {
      IGeas public baseGeas;

      constructor(address _geas) {
          baseGeas = IGeas(_geas);
      }
  }

  contract BloodCurse is GeasModifier {
      constructor(address _geas) GeasModifier(_geas) {}

      function getPotency() external view override returns (uint256) {
          return baseGeas.getPotency() + 50;
      }
  }

  contract VoidTaint is GeasModifier {
      constructor(address _geas) GeasModifier(_geas) {}

      function getPotency() external view override returns (uint256) {
          return baseGeas.getPotency() * 2;
      }
  }
tags: [solidity, structural, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator allows for the dynamic wrapping of a smart contract with additional layers of curses and taints. Each layer wraps the previous, amplifying the total potency of the geas on the decentralized ledger.
