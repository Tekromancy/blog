---
title: The State
description: Altering a construct's behavior when its internal elemental state changes.
type: objc
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Subschool: Elementalism"
formula: |2
  @protocol TKElementalState <NSObject>
  - (void)attack;
  @end

  @interface TKElemental : NSObject
  @property (nonatomic, strong) id<TKElementalState> currentState;
  - (void)attack;
  @end
  @implementation TKElemental
  - (void)attack { [self.currentState attack]; }
  @end

  @interface TKFireState : NSObject <TKElementalState>
  @end
  @implementation TKFireState
  - (void)attack { NSLog(@"Unleashes a torrent of fire!"); }
  @end
tags: [objc, state, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The State pattern allows a construct to seemingly change its class at runtime by mutating its internal state strategy, seamlessly shifting from fire to ice.
