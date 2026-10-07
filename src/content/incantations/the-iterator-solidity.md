---
title: The Iterator
description: Traversing a crypt of lost souls without revealing its underlying topology.
type: solidity
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Traversal
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface ISoulIterator {
      function hasNext() external view returns (bool);
      function next() external returns (address);
  }

  contract SoulCrypt {
      address[] private entombedSouls;

      function entomb(address soul) external {
          entombedSouls.push(soul);
      }

      function getSoulsCount() external view returns (uint256) {
          return entombedSouls.length;
      }

      function getSoulAt(uint256 index) external view returns (address) {
          return entombedSouls[index];
      }
  }

  contract CryptIterator is ISoulIterator {
      SoulCrypt public crypt;
      uint256 public currentIndex;

      constructor(address _crypt) {
          crypt = SoulCrypt(_crypt);
          currentIndex = 0;
      }

      function hasNext() external view override returns (bool) {
          return currentIndex < crypt.getSoulsCount();
      }

      function next() external override returns (address) {
          require(currentIndex < crypt.getSoulsCount(), "End of crypt.");
          address soul = crypt.getSoulAt(currentIndex);
          currentIndex++;
          return soul;
      }
  }
tags: [solidity, behavioral, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Iterator extracts the traversal logic from the underlying storage mechanism. When iterating through a crypt of lost souls, external contracts need not know if they are stored in arrays, mappings, or cursed linked lists; the Iterator provides a unified path through the dark.
