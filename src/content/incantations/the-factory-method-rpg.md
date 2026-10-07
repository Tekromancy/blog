---
title: "Factory Method: The Spawning Rune"
description: "Define an interface for creating a Ward, but let subclasses decide which class to instantiate."
type: rpg
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Creation"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  // A service program exporting a factory rune
  Dcl-Proc CreateDocument Export;
    Dcl-Pi *N Pointer;
      DocType Char(10) Const;
    End-Pi;

    Select;
      When DocType = 'INVOICE';
        Return CreateInvoiceRune();
      When DocType = 'PO';
        Return CreatePORune();
      Other;
        Return *Null;
    EndSl;
  End-Proc;
tags: [creational, ibm-i, runes, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Factory Method

A common technique among iSeries Wards, the Factory Method delegates the instantiation of specific Business Logic Runes (like handling an Invoice or a Purchase Order) based on the inputs to a generalized Service Program method.
