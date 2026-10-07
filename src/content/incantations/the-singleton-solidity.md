---
title: The Singleton
description: The single immutable dark grimoire on the blockchain, eternally singular.
type: solidity
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Warding"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract DarkGrimoire {
      address private staticInstance;

      // In Solidity, contracts are inherently singletons if only deployed once.
      // To enforce this within another contract system:

      bool private initialized;

      function init() public {
          require(!initialized, "The Grimoire is already bound to this realm.");
          initialized = true;
          staticInstance = address(this);
      }

      function readSecrets() public view returns (string memory) {
          require(initialized, "Grimoire uninitialized.");
          return "Arcane secrets of the deep ledger.";
      }
  }
tags: [solidity, creational, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the physical realm, a singleton restricts instantiation. In the decentralized void, a smart contract is inherently a singleton once deployed to an address. We enforce initialization locks to prevent the rewriting of the fundamental rules of the Dark Grimoire.
