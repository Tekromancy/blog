---
title: The State
description: Morphing a demonic entity's behavior as its physical form transforms.
type: solidity
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface IDemonicForm {
      function attack() external returns (string memory);
  }

  contract LarvaForm is IDemonicForm {
      function attack() external pure override returns (string memory) {
          return "Bite with weak mandibles.";
      }
  }

  contract BehemothForm is IDemonicForm {
      function attack() external pure override returns (string memory) {
          return "Crush with abyssal strength!";
      }
  }

  contract Shapeshifter {
      IDemonicForm public currentForm;

      constructor(address _initialForm) {
          currentForm = IDemonicForm(_initialForm);
      }

      function mutate(address _newForm) external {
          currentForm = IDemonicForm(_newForm);
      }

      function strike() external returns (string memory) {
          return currentForm.attack();
      }
  }
tags: [solidity, behavioral, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A demonic entity is rarely static. As it devours souls, it morphs. The State pattern delegates the entity's behavior to its current form contract. When the entity mutates, it merely swaps its state pointer, entirely shifting its offensive capabilities on the ledger.
