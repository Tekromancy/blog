---
title: The Chain of Responsibility
description: Passing requests along a sequence of wards.
type: objc
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Subschool: Sequences"
formula: |2
  @interface TKWard : NSObject
  @property (nonatomic, strong) TKWard *nextWard;
  - (void)handleIntrusion:(NSInteger)powerLevel;
  @end
  @implementation TKWard
  - (void)handleIntrusion:(NSInteger)powerLevel {
      if (self.nextWard) {
          [self.nextWard handleIntrusion:powerLevel];
      }
  }
  @end

  @interface TKFireWard : TKWard
  @end
  @implementation TKFireWard
  - (void)handleIntrusion:(NSInteger)powerLevel {
      if (powerLevel < 10) { NSLog(@"FireWard dispersed the threat."); }
      else { [super handleIntrusion:powerLevel]; }
  }
  @end
tags: [objc, chain-of-responsibility, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Chain of Responsibility establishes a gauntlet of protective wards. If a ward cannot contain an entity, the plea is passed sequentially down the chain.
