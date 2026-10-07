---
title: The Proxy
description: A placeholder ward that delays or controls access.
type: objc
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Subschool: Warding"
formula: |2
  @protocol TKGrimoire <NSObject>
  - (void)readSecrets;
  @end

  @interface TKAncientGrimoire : NSObject <TKGrimoire>
  @end
  @implementation TKAncientGrimoire
  - (instancetype)init {
      self = [super init];
      // Heavy loading of arcane texts
      return self;
  }
  - (void)readSecrets { NSLog(@"The secrets of the cosmos..."); }
  @end

  @interface TKGrimoireProxy : NSObject <TKGrimoire>
  @property (nonatomic, strong) TKAncientGrimoire *realGrimoire;
  @end
  @implementation TKGrimoireProxy
  - (void)readSecrets {
      if (!self.realGrimoire) {
          self.realGrimoire = [[TKAncientGrimoire alloc] init];
      }
      [self.realGrimoire readSecrets];
  }
  @end
tags: [objc, proxy, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Proxy acts as an astral projection of the true artifact, deferring the immense cost of materializing the real grimoire until absolutely necessary.
