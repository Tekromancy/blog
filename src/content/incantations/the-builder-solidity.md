---
title: The Builder
description: Constructing complex demonic geases step-by-step through a decentralized ritual.
type: solidity
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Ritualism"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract Geas {
      string public bindingWords;
      uint256 public soulCost;
      address public target;

      function setBindingWords(string memory _words) public { bindingWords = _words; }
      function setSoulCost(uint256 _cost) public { soulCost = _cost; }
      function setTarget(address _target) public { target = _target; }
  }

  interface IGeasBuilder {
      function chantWords(string memory _words) external;
      function offerSouls(uint256 _cost) external;
      function designateTarget(address _target) external;
      function materialize() external view returns (Geas);
  }

  contract InfernalGeasBuilder is IGeasBuilder {
      Geas private currentGeas;

      constructor() {
          currentGeas = new Geas();
      }

      function chantWords(string memory _words) external override {
          currentGeas.setBindingWords(_words);
      }

      function offerSouls(uint256 _cost) external override {
          currentGeas.setSoulCost(_cost);
      }

      function designateTarget(address _target) external override {
          currentGeas.setTarget(_target);
      }

      function materialize() external view override returns (Geas) {
          return currentGeas;
      }
  }
tags: [solidity, creational, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the ritual requires precise, sequential incantations to form an immutable geas, the Builder pattern provides the scaffold. It allows the warlock to construct a complex smart contract entity step-by-step before finalizing the unholy creation on the decentralized ledger.
