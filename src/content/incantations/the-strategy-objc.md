---
title: The Strategy
description: Interchanging arcane algorithms dynamically.
type: objc
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Subschool: Tactics"
formula: |2
  @protocol TKCombatStrategy <NSObject>
  - (void)executeTactics;
  @end

  @interface TKWarlord : NSObject
  @property (nonatomic, strong) id<TKCombatStrategy> strategy;
  - (void)engage;
  @end
  @implementation TKWarlord
  - (void)engage { [self.strategy executeTactics]; }
  @end

  @interface TKStealthStrategy : NSObject <TKCombatStrategy>
  @end
  @implementation TKStealthStrategy
  - (void)executeTactics { NSLog(@"Attacking from the shadows."); }
  @end
tags: [objc, strategy, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Strategy isolates the varied tactics of battle from the warlords that invoke them. Strategies can be hot-swapped during combat via message passing.
