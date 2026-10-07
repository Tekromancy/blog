---
title: The Chain of Responsibility of the Tribunal
description: Pass an arcane request along a chain of server-side adjudicators.
type: coldfusion
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Wards"
formula: |2
  component name="Ward" {
      variables.nextWard = null;

      public Ward function setNext(Ward next) {
          variables.nextWard = arguments.next;
          return variables.nextWard;
      }

      public string function handle(numeric darkEnergy) {
          if (!isNull(variables.nextWard)) {
              return variables.nextWard.handle(arguments.darkEnergy);
          }
          return "Energy dissipated.";
      }
  }

  component name="MinorWard" extends="Ward" {
      public string function handle(numeric darkEnergy) {
          if (arguments.darkEnergy < 10) return "Minor Ward absorbed the energy.";
          return super.handle(arguments.darkEnergy);
      }
  }

  component name="MajorWard" extends="Ward" {
      public string function handle(numeric darkEnergy) {
          if (arguments.darkEnergy < 100) return "Major Ward contained the blast.";
          return super.handle(arguments.darkEnergy);
      }
  }
tags: [chain-of-responsibility, coldfusion, tribunals, filtering]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Incoming curses are routed through layers of tag-wards. If a minor ward cannot handle the dark energy, it passes the burden to the major ward. The alchemist sets the chain, unconcerned with which specific layer eventually neutralizes the threat.
