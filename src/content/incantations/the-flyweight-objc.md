---
title: The Flyweight
description: Sharing intrinsic ethereal essence to save memory.
type: objc
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Subschool: Efficiency"
formula: |2
  @interface TKSigil : NSObject
  @property (nonatomic, strong, readonly) NSString *runeName;
  - (instancetype)initWithName:(NSString *)name;
  - (void)glowAtPosition:(CGPoint)position;
  @end
  @implementation TKSigil
  - (instancetype)initWithName:(NSString *)name {
      if (self = [super init]) { _runeName = name; }
      return self;
  }
  - (void)glowAtPosition:(CGPoint)position { }
  @end

  @interface TKSigilFactory : NSObject
  @property (nonatomic, strong) NSMutableDictionary *sigils;
  - (TKSigil *)sigilForName:(NSString *)name;
  @end
  @implementation TKSigilFactory
  - (instancetype)init {
      if (self = [super init]) { _sigils = [NSMutableDictionary dictionary]; }
      return self;
  }
  - (TKSigil *)sigilForName:(NSString *)name {
      if (!self.sigils[name]) {
          self.sigils[name] = [[TKSigil alloc] initWithName:name];
      }
      return self.sigils[name];
  }
  @end
tags: [objc, flyweight, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Flyweight shares memory-heavy runes among countless invocations. A master cache of sigils guarantees we do not exhaust our mana pool.
