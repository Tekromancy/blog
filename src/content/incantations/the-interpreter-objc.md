---
title: The Interpreter
description: Deciphering the grammatical syntax of runic languages.
type: objc
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Subschool: Linguistics"
formula: |2
  @protocol TKRuneExpression <NSObject>
  - (BOOL)interpret:(NSString *)context;
  @end

  @interface TKTerminalRune : NSObject <TKRuneExpression>
  @property (nonatomic, strong) NSString *data;
  - (instancetype)initWithData:(NSString *)data;
  @end
  @implementation TKTerminalRune
  - (instancetype)initWithData:(NSString *)data {
      if (self = [super init]) { _data = data; }
      return self;
  }
  - (BOOL)interpret:(NSString *)context {
      return [context containsString:self.data];
  }
  @end
tags: [objc, interpreter, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Interpreter binds an abstract syntax tree of runes. By parsing the tree, ancient NeXTSTEP compilers divine the meaning of complex magical phrases.
