---
title: The Prototype
description: Cloning entities using NSCopying protocols.
type: objc
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Subschool: Replication"
formula: |2
  @interface TKIllusion : NSObject <NSCopying>
  @property (nonatomic, copy) NSString *visage;
  - (instancetype)initWithVisage:(NSString *)visage;
  @end
  @implementation TKIllusion
  - (instancetype)initWithVisage:(NSString *)visage {
      if (self = [super init]) { _visage = visage; }
      return self;
  }
  - (id)copyWithZone:(NSZone *)zone {
      return [[[self class] allocWithZone:zone] initWithVisage:self.visage];
  }
  @end
tags: [objc, prototype, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using NSCopying, the Prototype weaves identical copies of a conjuration, avoiding the heavy toll of reconstructing complex illusions.
