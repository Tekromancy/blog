---
title: The Adapter
description: Translating arcane tongues into the standard NeXTSTEP protocols.
type: objc
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Subschool: Linguistics"
formula: |2
  @protocol TKModernSpell <NSObject>
  - (void)invokeMagic;
  @end

  @interface TKAncientScroll : NSObject
  - (void)chantAncientRunes;
  @end
  @implementation TKAncientScroll
  - (void)chantAncientRunes { NSLog(@"Chanting in dead tongues."); }
  @end

  @interface TKScrollAdapter : NSObject <TKModernSpell>
  @property (nonatomic, strong) TKAncientScroll *scroll;
  - (instancetype)initWithScroll:(TKAncientScroll *)scroll;
  @end
  @implementation TKScrollAdapter
  - (instancetype)initWithScroll:(TKAncientScroll *)scroll {
      if (self = [super init]) { _scroll = scroll; }
      return self;
  }
  - (void)invokeMagic {
      [self.scroll chantAncientRunes];
  }
  @end
tags: [objc, adapter, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Adapter acts as an arcane translator, adapting the rugged edges of ancient scrolls into the unified messaging interface of modern invocations.
