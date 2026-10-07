---
title: The Chain of Responsibility
description: Passing the sacrificial offering through a hierarchy of demonic overlords.
type: solidity
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Enchantment // Hierarchy
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  abstract contract Overlord {
      Overlord public nextOverlord;

      function setNext(address _next) external {
          nextOverlord = Overlord(_next);
      }

      function processSacrifice(uint256 amount) public virtual;
  }

  contract Imp is Overlord {
      function processSacrifice(uint256 amount) public override {
          if (amount < 10) {
              // Imp consumes the small sacrifice
          } else if (address(nextOverlord) != address(0)) {
              nextOverlord.processSacrifice(amount);
          }
      }
  }

  contract Archdemon is Overlord {
      function processSacrifice(uint256 amount) public override {
          if (amount >= 10 && amount < 100) {
              // Archdemon consumes the moderate sacrifice
          } else if (address(nextOverlord) != address(0)) {
              nextOverlord.processSacrifice(amount);
          }
      }
  }

  contract DemonLord is Overlord {
      function processSacrifice(uint256 amount) public override {
          if (amount >= 100) {
              // Demon Lord consumes the grand sacrifice
          }
      }
  }
tags: [solidity, behavioral, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility dictates that a sacrificial offering flows upward through the infernal hierarchy. If a lesser Imp cannot handle the magnitude of the soul offered, it passes the burden up the chain to the Archdemon, and eventually to the Demon Lord.
