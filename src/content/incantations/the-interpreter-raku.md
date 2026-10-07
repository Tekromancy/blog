---
title: Interpreter
description: Parsing the long-forgotten dialect of the Hundred-Year Spell's incantation.
type: raku
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  role Expression {
      method interpret(Hash $context --> Int) { ... }
  }

  class CenturyVariable does Expression {
      has Str $.name;
      method interpret(Hash $context --> Int) {
          return $context{$!name} // 0;
      }
  }

  class AddPower does Expression {
      has Expression $.left;
      has Expression $.right;
      
      method interpret(Hash $context --> Int) {
          return $!left.interpret($context) + $!right.interpret($context);
      }
  }

  # Context holds the raw magical energy levels
  my %context = (
      'LeyLineAlpha' => 50,
      'BloodSacrifice' => 100
  );

  my $expr = AddPower.new(
      left  => CenturyVariable.new(name => 'LeyLineAlpha'),
      right => CenturyVariable.new(name => 'BloodSacrifice')
  );

  my $total-power = $expr.interpret(%context);
  say "The interpreted spell yields $total-power units of magical energy.";
tags: [behavioral, interpreter, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The grammar of high magic is complex and dangerous. The Interpreter pattern allows us to define a representation for our arcane grammar along with an interpreter to compute sentences. When a Hundred-Year Spell is found inscribed in an ancient dialect, this pattern breaks down the symbols into computable magical energy.
