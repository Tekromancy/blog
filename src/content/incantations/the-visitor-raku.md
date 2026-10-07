---
title: Visitor
description: Extracting deep esoteric data from a disparate collection of century wards.
type: raku
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Analysis"
formula: |2
  role SpellVisitor {
      method visit-fire-ward($ward) { ... }
      method visit-frost-ward($ward) { ... }
  }

  role WardElement {
      method accept(SpellVisitor $v) { ... }
  }

  class FireWard does WardElement {
      has Int $.heat-level = 500;
      method accept(SpellVisitor $v) { $v.visit-fire-ward(self) }
  }

  class FrostWard does WardElement {
      has Int $.chill-factor = -200;
      method accept(SpellVisitor $v) { $v.visit-frost-ward(self) }
  }

  class DiagnosticsVisitor does SpellVisitor {
      method visit-fire-ward($ward) {
          say "Diagnostics: Fire Ward is running at heat level ", $ward.heat-level;
      }
      
      method visit-frost-ward($ward) {
          say "Diagnostics: Frost Ward is running at chill factor ", $ward.chill-factor;
      }
  }

  my @wards = FireWard.new, FrostWard.new;
  my $diagnostics = DiagnosticsVisitor.new;

  for @wards -> $ward {
      $ward.accept($diagnostics);
  }
tags: [behavioral, visitor, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

A castle protected by a Hundred-Year Spell will contain dozens of different wards. When an Archmage needs to perform diagnostics, they should not have to rewrite the internal code of every ward. The Visitor pattern separates the diagnostic algorithms from the ward objects themselves, using double-dispatch to extract the precise esoteric data needed without modifying the defensive constructs.
