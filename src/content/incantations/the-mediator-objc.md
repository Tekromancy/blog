---
title: The Mediator
description: A central arbiter of chaos among warring magical factions.
type: objc
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Subschool: Harmony"
formula: |2
  @class TKMage;
  @protocol TKCovenMediator <NSObject>
  - (void)mage:(TKMage *)mage castSpell:(NSString *)spell;
  @end

  @interface TKMage : NSObject
  @property (nonatomic, weak) id<TKCovenMediator> mediator;
  @property (nonatomic, strong) NSString *name;
  - (void)cast:(NSString *)spell;
  - (void)receiveEffect:(NSString *)effect;
  @end
  @implementation TKMage
  - (void)cast:(NSString *)spell { [self.mediator mage:self castSpell:spell]; }
  - (void)receiveEffect:(NSString *)effect { NSLog(@"%@ feels %@", self.name, effect); }
  @end
tags: [objc, mediator, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Mediator coordinates complex interactions between many Mages, acting as the nexus of their coven and preventing chaotic direct message passing loops.
