---
title: The Template Method
description: Defining the skeleton of a blood ritual while leaving sacrifices to the caster.
type: solidity
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Ritual Skeleton
formula: |
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  abstract contract GrandRitual {
      // The Template Method
      function executeRitual() external {
          prepareChalkLines();
          offerSacrifice();
          invokeDeity();
      }

      function prepareChalkLines() private pure {
          // Standard ritual circle
      }

      // Steps to be implemented by subclasses
      function offerSacrifice() internal virtual;
      function invokeDeity() internal virtual;
  }

  contract CultOfCthulhu is GrandRitual {
      function offerSacrifice() internal override {
          // Offer aquatic aberrations
      }

      function invokeDeity() internal override {
          // Chant Ph'nglui mglw'nafh
      }
  }
tags: [solidity, behavioral, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method lays down the unchangeable skeleton of a grand ritual. The overarching flow of the spell is cemented in the base contract, while the specific, gruesome details of the sacrifices and deity invocations are delegated to the specific cult's subclass implementation.
