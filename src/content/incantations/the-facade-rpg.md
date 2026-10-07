---
title: "Facade: The Simplified Sigil"
description: "Provide a unified interface to a set of complex DB2 subsystems."
type: rpg
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  // The Facade Procedure
  Dcl-Proc ProcessOrder Facade Export;
    Dcl-Pi *N Ind;
      OrderNum Int(10) Const;
    End-Pi;

    If Not VerifyInventory(OrderNum);
       Return *Off;
    EndIf;

    ChargeCustomer(OrderNum);
    DispatchShipping(OrderNum);

    Return *On;
  End-Proc;
tags: [structural, ibm-i, runes, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Facade

The Facade is one of the most common spells encountered on the iSeries. It encapsulates convoluted interactions with multiple old-world subsystems (Inventory, Billing, Shipping) into a single, clean Free-Format Business Logic Rune.
