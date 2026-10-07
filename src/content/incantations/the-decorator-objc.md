---
title: The Decorator
description: Wrapping objects in layers of ethereal augmentation.
type: objc
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Subschool: Warding"
formula: |2
  @protocol TKSpell <NSObject>
  - (void)cast;
  @end

  @interface TKBasicSpell : NSObject <TKSpell>
  @end
  @implementation TKBasicSpell
  - (void)cast { NSLog(@"A simple spark."); }
  @end

  @interface TKSpellDecorator : NSObject <TKSpell>
  @property (nonatomic, strong) id<TKSpell> baseSpell;
  - (instancetype)initWithSpell:(id<TKSpell>)spell;
  @end
  @implementation TKSpellDecorator
  - (instancetype)initWithSpell:(id<TKSpell>)spell {
      if (self = [super init]) { _baseSpell = spell; }
      return self;
  }
  - (void)cast { [self.baseSpell cast]; }
  @end

  @interface TKFireDecorator : TKSpellDecorator
  @end
  @implementation TKFireDecorator
  - (void)cast {
      [super cast];
      NSLog(@"Wreathed in flames!");
  }
  @end
tags: [objc, decorator, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Decorator enables dynamic empowerment of basic spells, wrapping them in Objective-C subclasses that intercept messages and amplify their effects.
