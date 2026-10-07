---
title: The Builder
description: Step-by-step construction of complex magical artifacts inside bracketed summoning cages.
type: objc
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Subschool: Artifice"
formula: |2
  @interface TKArtifact : NSObject
  @property (nonatomic, strong) NSString *core;
  @property (nonatomic, strong) NSString *enchantment;
  @end
  @implementation TKArtifact
  @end

  @interface TKArtifactBuilder : NSObject
  @property (nonatomic, strong) TKArtifact *artifact;
  - (instancetype)init;
  - (void)addCore:(NSString *)core;
  - (void)addEnchantment:(NSString *)enchantment;
  - (TKArtifact *)build;
  @end
  @implementation TKArtifactBuilder
  - (instancetype)init {
      self = [super init];
      if (self) { _artifact = [[TKArtifact alloc] init]; }
      return self;
  }
  - (void)addCore:(NSString *)core { self.artifact.core = core; }
  - (void)addEnchantment:(NSString *)enchantment { self.artifact.enchantment = enchantment; }
  - (TKArtifact *)build { return self.artifact; }
  @end
tags: [objc, builder, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By utilizing Objective-C's mutable properties, the Builder pattern crafts intricate magical tools step-by-step, caging complexities within a unified interface.
