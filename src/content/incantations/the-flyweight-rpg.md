---
title: "Flyweight: The Shared Essence"
description: "Use sharing to support large numbers of fine-grained Runes efficiently."
type: rpg
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Material"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds IntrinsicState_t Qualified Template;
    Name Char(10);
    Type Char(10);
  End-Ds;

  Dcl-Ds Cache Dim(100) Likeds(IntrinsicState_t) Static;
  Dcl-S CacheCount Int(10) Static Inz(0);

  Dcl-Proc GetFlyweight Export;
    Dcl-Pi *N Pointer;
      RequestedName Char(10) Const;
    End-Pi;

    Dcl-S i Int(10);
    For i = 1 to CacheCount;
       If Cache(i).Name = RequestedName;
          Return %Addr(Cache(i));
       EndIf;
    EndFor;

    CacheCount += 1;
    Cache(CacheCount).Name = RequestedName;
    Cache(CacheCount).Type = 'RUNE';
    Return %Addr(Cache(CacheCount));
  End-Proc;
tags: [structural, ibm-i, runes, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Flyweight

Memory on the AS/400 is vast, but allocating thousands of identical Wards is wasteful. The Flyweight caches intrinsic configurations so that thousands of Extrinsic invocations can point to the same physical Data Structure.
