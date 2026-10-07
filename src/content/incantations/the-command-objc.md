---
title: The Command
description: Encapsulating a spell cast as an object for later execution.
type: objc
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Subschool: Encapsulation"
formula: |2
  @protocol TKIncantation <NSObject>
  - (void)execute;
  @end

  @interface TKTeleportIncantation : NSObject <TKIncantation>
  @property (nonatomic, strong) NSString *destination;
  - (instancetype)initWithDestination:(NSString *)dest;
  @end
  @implementation TKTeleportIncantation
  - (instancetype)initWithDestination:(NSString *)dest {
      if (self = [super init]) { _destination = dest; }
      return self;
  }
  - (void)execute { NSLog(@"Teleporting to %@", self.destination); }
  @end
tags: [objc, command, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Command captures the very essence of a spell inside an object, permitting undo operations, queuing, and macro spells through NSInvocation or blocks.
