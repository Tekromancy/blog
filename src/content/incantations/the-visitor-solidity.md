---
title: The Visitor
description: An astral projection traversing and analyzing heterogeneous soul structures.
type: solidity
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface IVisitor {
      function visitDamned(address damned) external;
      function visitExalted(address exalted) external;
  }

  interface ISoulNode {
      function accept(address visitor) external;
  }

  contract DamnedSoul is ISoulNode {
      function accept(address visitor) external override {
          IVisitor(visitor).visitDamned(address(this));
      }
  }

  contract ExaltedSoul is ISoulNode {
      function accept(address visitor) external override {
          IVisitor(visitor).visitExalted(address(this));
      }
  }

  contract TormentAnalyzer is IVisitor {
      uint256 public totalTorment;

      function visitDamned(address damned) external override {
          totalTorment += 100;
      }

      function visitExalted(address exalted) external override {
          totalTorment += 0; // Exalted feel no torment
      }
  }
tags: [solidity, behavioral, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Visitor pattern allows an external entity, like an astral projection, to traverse a heterogeneous network of souls. Without modifying the individual soul contracts, the warlock can deploy new analytic visitors to compute torment, harvest energy, or enforce new laws across the entire structure.
