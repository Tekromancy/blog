---
title: "Singleton: The Core DB2 Connection"
description: "Ensure a Ward has only one instance, and provide a global point of access to it."
type: rpg
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Ward"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-S SingleInstance Pointer Static Inz(*Null);

  Dcl-Ds Config_t Qualified Template;
    DbName Char(20);
    IsActive Ind;
  End-Ds;

  Dcl-Proc GetConfigInstance Export;
    Dcl-Pi *N Pointer;
    End-Pi;

    Dcl-Ds Config Likeds(Config_t) Based(SingleInstance);

    If SingleInstance = *Null;
       SingleInstance = %Alloc(%Size(Config_t));
       Config.DbName = 'PRODDB';
       Config.IsActive = *On;
    EndIf;

    Return SingleInstance;
  End-Proc;
tags: [creational, ibm-i, runes, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Singleton

The Singleton is an essential ward for caching DB2 connections or system configuration properties in RPGLE. Using a static variable scoped to the module ensures that the runtime only ever spawns a single copy of this critical structure.
