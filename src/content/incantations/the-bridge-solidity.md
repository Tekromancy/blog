---
title: The Bridge
description: Severing the bond between the ethereal planes and the physical ledgers.
type: solidity
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Dimensional"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  // Implementor
  interface ILedgerPlane {
      function recordSoul(string memory soulName) external;
  }

  contract AbyssalLedger is ILedgerPlane {
      function recordSoul(string memory soulName) external pure override {
          // Record in the abyss
      }
  }

  contract VoidLedger is ILedgerPlane {
      function recordSoul(string memory soulName) external pure override {
          // Record in the void
      }
  }

  // Abstraction
  abstract contract DemonicRitual {
      ILedgerPlane public ledger;

      constructor(address _ledger) {
          ledger = ILedgerPlane(_ledger);
      }

      function performSacrifice(string memory soulName) public virtual;
  }

  contract BloodSacrifice extends DemonicRitual {
      constructor(address _ledger) DemonicRitual(_ledger) {}

      function performSacrifice(string memory soulName) public override {
          // Ritualistic modifiers
          ledger.recordSoul(soulName);
      }
  }
tags: [solidity, structural, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge separates the ritual's abstraction from its underlying storage plane. Whether casting a Blood Sacrifice to the Abyssal Ledger or the Void Ledger, the warlock can swap dimensions without altering the fundamental spell logic.
