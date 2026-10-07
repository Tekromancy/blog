---
title: The Abstract Factory
description: Conjure families of related objects through dynamic message passing.
type: objc
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Subschool: NeXTSTEP Runes"
formula: |2
  @protocol TKSpell <NSObject>
  - (void)cast;
  @end

  @protocol TkWand <NSObject>
  - (void)channel;
  @end

  @protocol TKMagicFactory <NSObject>
  - (id<TKSpell>)createSpell;
  - (id<TkWand>)createWand;
  @end

  @interface TKPyromancyFactory : NSObject <TKMagicFactory>
  @end
  @implementation TKPyromancyFactory
  - (id<TKSpell>)createSpell { return nil; }
  - (id<TkWand>)createWand { return nil; }
  @end
tags: [objc, neXTSTEP, abstract-factory, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory within the Objective-C runtime uses dynamic message passing to conjure related families of magical constructs.
