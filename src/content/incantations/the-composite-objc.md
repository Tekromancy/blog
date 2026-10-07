---
title: The Composite
description: Treating single constructs and their amalgamations uniformly.
type: objc
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Subschool: Swarm"
formula: |2
  @protocol TKGolem <NSObject>
  - (void)awaken;
  @end

  @interface TKClayGolem : NSObject <TKGolem>
  @end
  @implementation TKClayGolem
  - (void)awaken { NSLog(@"Clay golem stirs."); }
  @end

  @interface TKGolemLegion : NSObject <TKGolem>
  @property (nonatomic, strong) NSMutableArray<id<TKGolem>> *golems;
  - (void)addGolem:(id<TKGolem>)golem;
  @end
  @implementation TKGolemLegion
  - (instancetype)init {
      if (self = [super init]) { _golems = [NSMutableArray array]; }
      return self;
  }
  - (void)addGolem:(id<TKGolem>)golem { [self.golems addObject:golem]; }
  - (void)awaken {
      for (id<TKGolem> golem in self.golems) {
          [golem awaken];
      }
  }
  @end
tags: [objc, composite, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Composite creates nested hierarchies of golems, summoned identically whether they be solitary beasts or entire legions.
