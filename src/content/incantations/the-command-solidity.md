---
title: The Command
description: Encapsulating a sinister decree into an executable, stoppable token.
type: solidity
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface ISinisterDecree {
      function execute() external;
  }

  contract TargetRealm {
      bool public isCorrupted;
      function corrupt() external { isCorrupted = true; }
  }

  contract CorruptRealmDecree is ISinisterDecree {
      TargetRealm public realm;

      constructor(address _realm) {
          realm = TargetRealm(_realm);
      }

      function execute() external override {
          realm.corrupt();
      }
  }

  contract DarkInvoker {
      ISinisterDecree[] public queuedDecrees;

      function queueDecree(address _decree) external {
          queuedDecrees.push(ISinisterDecree(_decree));
      }

      function unleash() external {
          for (uint i = 0; i < queuedDecrees.length; i++) {
              queuedDecrees[i].execute();
          }
          delete queuedDecrees;
      }
  }
tags: [solidity, behavioral, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command pattern binds an unholy action into an object. It allows warlocks to queue sinister decrees, parameterize invocations, and delay execution on the ledger until the stars align and the Invoker unleashes them all at once.
