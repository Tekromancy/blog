---
title: The Visitor
description: Adding operations to complex arcane structures without modifying them.
type: objc
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Subschool: Inspection"
formula: |2
  @class TKFireRune, TKWaterRune;
  @protocol TKRuneVisitor <NSObject>
  - (void)visitFireRune:(TKFireRune *)rune;
  - (void)visitWaterRune:(TKWaterRune *)rune;
  @end

  @protocol TKRuneElement <NSObject>
  - (void)acceptVisitor:(id<TKRuneVisitor>)visitor;
  @end

  @interface TKFireRune : NSObject <TKRuneElement>
  @end
  @implementation TKFireRune
  - (void)acceptVisitor:(id<TKRuneVisitor>)visitor { [visitor visitFireRune:self]; }
  @end

  @interface TKWaterRune : NSObject <TKRuneElement>
  @end
  @implementation TKWaterRune
  - (void)acceptVisitor:(id<TKRuneVisitor>)visitor { [visitor visitWaterRune:self]; }
  @end
tags: [objc, visitor, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Visitor acts as an ethereal inspector, traveling through object structures and executing new logic without defiling the ancestral NeXTSTEP objects.
