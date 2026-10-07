---
title: The Observer
description: Sensing ripples in the magical weave.
type: objc
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Subschool: Sensing"
formula: |2
  @interface TKCrystalBall : NSObject
  - (void)gaze;
  @end

  @implementation TKCrystalBall
  - (instancetype)init {
      self = [super init];
      if (self) {
          [[NSNotificationCenter defaultCenter] addObserver:self
                                                   selector:@selector(leylineShifted:)
                                                       name:@"LeylineShiftedNotification"
                                                     object:nil];
      }
      return self;
  }
  - (void)leylineShifted:(NSNotification *)note {
      NSLog(@"The crystal ball pulses with energy.");
  }
  - (void)dealloc {
      [[NSNotificationCenter defaultCenter] removeObserver:self];
  }
  - (void)gaze {}
  @end
tags: [objc, observer, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Harnessing NSNotificationCenter, the Observer pattern reacts dynamically to systemic ripples, letting objects know when a spell is woven anywhere in the realm.
