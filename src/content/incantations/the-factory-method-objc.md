---
title: The Factory Method
description: Defer instantiation to subclasses relying on the NSObject lineage.
type: objc
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Subschool: Evocation"
formula: |2
  @protocol TKFamiliar <NSObject>
  - (void)speak;
  @end

  @interface TKSummoner : NSObject
  - (id<TKFamiliar>)summonFamiliar; // The Factory Method
  @end
  @implementation TKSummoner
  - (id<TKFamiliar>)summonFamiliar {
      @throw [NSException exceptionWithName:NSInternalInconsistencyException
                                     reason:@"Subclasses must override" userInfo:nil];
  }
  @end
tags: [objc, factory-method, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Factory Method leverages the dynamic nature of NeXTSTEP's runtime. It binds familiar spirits by deferring exact class summoning until runtime.
