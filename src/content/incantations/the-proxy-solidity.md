---
title: The Proxy
description: An ethereal surrogate intercepting calls to the true demonic core.
type: solidity
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Illusion // Surrogate
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract TrueDemonicCore {
      uint256 public soulCount;
      
      function sacrifice() external {
          soulCount += 1;
      }
  }

  contract EtherealProxy {
      address public implementation;
      address public admin;

      constructor(address _impl) {
          implementation = _impl;
          admin = msg.sender;
      }

      function upgrade(address _newImpl) external {
          require(msg.sender == admin, "Only the High Warlock may upgrade.");
          implementation = _newImpl;
      }

      fallback() external payable {
          address impl = implementation;
          require(impl != address(0));
          
          assembly {
              let ptr := mload(0x40)
              calldatacopy(ptr, 0, calldatasize())
              let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)
              let size := returndatasize()
              returndatacopy(ptr, 0, size)

              switch result
              case 0 { revert(ptr, size) }
              default { return(ptr, size) }
          }
      }
  }
tags: [solidity, structural, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy is a foundational incantation in Solidity. It acts as an ethereal surrogate, forwarding all invocations to a mutable logic core via `delegatecall`. This allows the High Warlock to upgrade the underlying demonic logic without altering the ledger's binding address.
