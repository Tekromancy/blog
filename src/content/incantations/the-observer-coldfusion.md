---
title: The Observer of the Scrying Orb
description: Define a one-to-many dependency so that when one apparition changes state, all its scryers are notified.
type: coldfusion
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  interface name="IScryer" {
      public void update(string state);
  }

  component name="CrystalOrb" {
      variables.scryers = [];
      variables.vision = "";

      public void function attach(IScryer s) { arrayAppend(variables.scryers, s); }

      public void function setVision(string v) {
          variables.vision = v;
          notifyScryers();
      }

      private void function notifyScryers() {
          for (var s in variables.scryers) {
              s.update(variables.vision);
          }
      }
  }

  component name="Mage" implements="IScryer" {
      public void function update(string state) {
          writeOutput("Mage sees: " & arguments.state);
      }
  }
tags: [observer, coldfusion, scrying, pub-sub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Observer pattern is the backbone of remote magical surveillance. A central Crystal Orb maintains a list of attached Mages (Scryers). The moment the Orb detects a shift in the ether, it immediately broadcasts the new vision to all who are watching.
