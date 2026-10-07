---
title: The Observer
description: A dark prophecy network notifying cultists of ledger mutations.
type: solidity
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Prophecy"
formula: |2
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface ICultistObserver {
      function onProphecyFulfilled(string memory prophecy) external;
  }

  contract DarkOracle {
      ICultistObserver[] public cultists;

      function subscribe(address cultist) external {
          cultists.push(ICultistObserver(cultist));
      }

      function fulfillProphecy(string memory prophecy) external {
          for (uint i = 0; i < cultists.length; i++) {
              cultists[i].onProphecyFulfilled(prophecy);
          }
      }
  }

  contract Fanatic is ICultistObserver {
      string public latestProphecy;

      function onProphecyFulfilled(string memory prophecy) external override {
          latestProphecy = prophecy;
          // Initiate apocalyptic rituals
      }
  }
tags: [solidity, behavioral, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer pattern powers the dark prophecy networks of the smart contract realm. When the Dark Oracle changes state or witnesses an event, it iterates through its bound cultists, invoking their listener methods to cascade the apocalyptic data across the ledger.
