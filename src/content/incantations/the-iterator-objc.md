---
title: The Iterator
description: Sequentially traversing ethereal collections.
type: objc
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Subschool: Traversal"
formula: |2
  @protocol TKSpellbookIterator <NSObject>
  - (BOOL)hasNext;
  - (id)nextSpell;
  @end

  @interface TKGrimoireIterator : NSObject <TKSpellbookIterator>
  @property (nonatomic, strong) NSArray *spells;
  @property (nonatomic, assign) NSInteger currentIndex;
  - (instancetype)initWithSpells:(NSArray *)spells;
  @end
  @implementation TKGrimoireIterator
  - (instancetype)initWithSpells:(NSArray *)spells {
      if (self = [super init]) { _spells = spells; _currentIndex = 0; }
      return self;
  }
  - (BOOL)hasNext { return self.currentIndex < self.spells.count; }
  - (id)nextSpell {
      if ([self hasNext]) { return self.spells[self.currentIndex++]; }
      return nil;
  }
  @end
tags: [objc, iterator, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Iterator provides a safe means to parse a spellbook without exposing its internal representation, a precursor to Objective-C's native NSFastEnumeration.
