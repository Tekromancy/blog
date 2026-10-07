---
title: The Decorator of the Enchanted Layers
description: Dynamically attach additional wards and enchantments to an apparition.
type: coldfusion
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Wards"
formula: |2
  interface name="IApparition" {
      public string manifest();
  }

  component name="BaseGhost" implements="IApparition" {
      public string function manifest() {
          return "A ghostly figure appears.";
      }
  }

  component name="ApparitionDecorator" implements="IApparition" {
      variables.wraith = "";

      public ApparitionDecorator function init(IApparition wraith) {
          variables.wraith = arguments.wraith;
          return this;
      }

      public string function manifest() {
          return variables.wraith.manifest();
      }
  }

  component name="FlamingEnchantment" extends="ApparitionDecorator" {
      public string function manifest() {
          return super.manifest() & " It is wreathed in green fire!";
      }
  }
tags: [decorator, coldfusion, enchantments, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By wrapping a base ghost in decorators, the alchemist can dynamically stack wards. Need a flaming, poison-dripping, ethereal ghost? Simply nest the decorators. The underlying apparition remains oblivious to the immense dark powers layered upon it.
