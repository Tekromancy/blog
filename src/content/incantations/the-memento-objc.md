---
title: The Memento
description: Capturing and restoring the ethereal state of an entity.
type: objc
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Subschool: Preservation"
formula: |2
  @interface TKSoulShard : NSObject
  @property (nonatomic, strong, readonly) NSString *state;
  - (instancetype)initWithState:(NSString *)state;
  @end
  @implementation TKSoulShard
  - (instancetype)initWithState:(NSString *)state {
      if (self = [super init]) { _state = state; }
      return self;
  }
  @end

  @interface TKMage : NSObject
  @property (nonatomic, strong) NSString *healthState;
  - (TKSoulShard *)saveState;
  - (void)restoreState:(TKSoulShard *)shard;
  @end
  @implementation TKMage
  - (TKSoulShard *)saveState { return [[TKSoulShard alloc] initWithState:self.healthState]; }
  - (void)restoreState:(TKSoulShard *)shard { self.healthState = shard.state; }
  @end
tags: [objc, memento, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Memento bottles a mage's essence in a soul shard. If corrupted, they can reverse time and restore their state from this encapsulated crystal.
