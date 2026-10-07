---
title: The Abstract Factory
description: Forging demonic pacts and abyssal tokens through an abstract nexus of creation.
type: solidity
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Pactmaking
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface IDemonicPact {
      function executePact() external returns (string memory);
  }

  interface IAbyssalToken {
      function mintSoul() external returns (string memory);
  }

  interface IInfernalForge {
      function createPact() external returns (IDemonicPact);
      function createToken() external returns (IAbyssalToken);
  }

  contract BloodPact is IDemonicPact {
      function executePact() external pure override returns (string memory) {
          return "Blood pact sealed in the immutable ledger.";
      }
  }

  contract SoulToken is IAbyssalToken {
      function mintSoul() external pure override returns (string memory) {
          return "Soul fragment tokenized.";
      }
  }

  contract BloodForge is IInfernalForge {
      function createPact() external pure override returns (IDemonicPact) {
          return new BloodPact();
      }
      function createToken() external pure override returns (IAbyssalToken) {
          return new SoulToken();
      }
  }
tags: [solidity, creational, pacts]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory channels the abyssal energies to forge unholy artifacts. In the realm of smart contracts, this pattern ensures that demonic pacts and their associated tokens are instantiated from a singular, immutable forge, preventing the contamination of different magical lineages on the decentralized ledger.
