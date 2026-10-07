---
title: The Bridge
description: Decoupling the ethereal from the physical.
type: objc
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Subschool: Projection"
formula: |2
  @protocol TKEnchantment <NSObject>
  - (void)applyEffect;
  @end

  @interface TKWeapon : NSObject
  @property (nonatomic, strong) id<TKEnchantment> enchantment;
  - (instancetype)initWithEnchantment:(id<TKEnchantment>)enchantment;
  - (void)strike;
  @end
  @implementation TKWeapon
  - (instancetype)initWithEnchantment:(id<TKEnchantment>)enchantment {
      if (self = [super init]) { _enchantment = enchantment; }
      return self;
  }
  - (void)strike { [self.enchantment applyEffect]; }
  @end
tags: [objc, bridge, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Bridge isolates the weapon from its magical aura, preventing an explosion of subclass hierarchies. Message passing handles the rest.
