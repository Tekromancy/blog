---
title: The Singleton
description: Guaranteeing a singular nexus of power.
type: objc
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Subschool: Warding"
formula: |2
  @interface TKArcaneNexus : NSObject
  + (instancetype)sharedNexus;
  @end

  @implementation TKArcaneNexus
  + (instancetype)sharedNexus {
      static TKArcaneNexus *sharedInstance = nil;
      static dispatch_once_t onceToken;
      dispatch_once(&onceToken, ^{
          sharedInstance = [[self alloc] init];
      });
      return sharedInstance;
  }
  @end
tags: [objc, singleton, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Singleton pattern uses Grand Central Dispatch to ensure exactly one manifestation of a class ever exists, acting as an immutable ward of state.
