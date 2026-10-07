---
title: Iterator
description: Traversing the generations of a bloodline bound by a century curse.
type: raku
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Tracking"
formula: |2
  class Descendant {
      has Str $.name;
      has Int $.generation;
  }

  class Bloodline {
      has Descendant @.members;
      
      method add(Descendant $d) { @!members.push($d) }
      
      # Returning a Raku Sequence which acts as an iterator
      method traverse-generations() {
          return seq {
              for @!members -> $member {
                  take $member;
              }
          };
      }
  }

  my $bloodline = Bloodline.new;
  $bloodline.add(Descendant.new(name => "Aric the First", generation => 1));
  $bloodline.add(Descendant.new(name => "Beric the Bold", generation => 2));
  $bloodline.add(Descendant.new(name => "Ceric the Cursed", generation => 3));

  my $iterator = $bloodline.traverse-generations();

  for $iterator -> $descendant {
      say "The Hundred-Year Curse passes to {$descendant.name} (Gen {$descendant.generation}).";
  }
tags: [behavioral, iterator, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A curse meant to last a hundred years will inevitably span multiple generations. The Iterator pattern provides a standard mechanism to traverse the complex tree of a target's bloodline, ensuring the magic flows seamlessly from parent to child without exposing the underlying genealogical data structure to the spell's logic.
