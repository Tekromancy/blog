---
title: The Prototype
description: Cloning primordial curses without invoking the original summoning rites.
type: solidity
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Necromancy // Cloning
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface ICloneableCurse {
      function clone() external view returns (ICloneableCurse);
      function getCursePower() external view returns (uint256);
  }

  contract PrimordialCurse is ICloneableCurse {
      uint256 public power;
      address public originator;

      constructor(uint256 _power, address _originator) {
          power = _power;
          originator = _originator;
      }

      function clone() external view override returns (ICloneableCurse) {
          // In actual Solidity, EIP-1167 Minimal Proxy is used for cloning
          // For demonstration of the pattern interface:
          return new PrimordialCurse(power, originator);
      }

      function getCursePower() external view override returns (uint256) {
          return power;
      }
  }
tags: [solidity, creational, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Prototype allows warlocks to duplicate an existing curse without undergoing the arduous initialization rites. In Solidity, this is most commonly achieved via EIP-1167 Minimal Proxy contracts, cheaply duplicating the logic of a primordial smart contract.
