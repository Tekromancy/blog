---
title: Mediator
description: Coordinating the complex interplay of celestial bodies over a century.
type: raku
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Astromancy"
formula: |2
  class CelestialMediator { ... }

  role CelestialBody {
      has CelestialMediator $.mediator is rw;
      has Str $.name;
      
      method send-alignment() {
          say "$!name signals its alignment.";
          $!mediator.notify(self, 'alignment');
      }
      
      method receive-pulse() { ... }
  }

  class Moon does CelestialBody {
      method receive-pulse() { say "The Moon glows with sympathetic magic." }
  }

  class Comet does CelestialBody {
      method receive-pulse() { say "The Comet alters its trajectory slightly." }
  }

  class SpellMediator {
      has CelestialBody $.moon is rw;
      has CelestialBody $.comet is rw;
      
      method notify(CelestialBody $sender, Str $event) {
          if $event eq 'alignment' {
              if $sender === $!moon {
                  say "Mediator: Moon aligned. Pulsing the comet...";
                  $!comet.receive-pulse();
              }
          }
      }
  }

  my $mediator = SpellMediator.new;
  my $moon = Moon.new(name => "The Silver Moon", mediator => $mediator);
  my $comet = Comet.new(name => "Halley's Shadow", mediator => $mediator);

  $mediator.moon = $moon;
  $mediator.comet = $comet;

  $moon.send-alignment();
tags: [behavioral, mediator, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Over the span of a hundred years, the interactions between celestial bodies fueling a spell become wildly complex. Rather than having the Moon communicate directly with the Comet, the Mediator pattern centralizes this logic. It acts as the grand orchestrator of the celestial dance, simplifying dependencies and preventing chaotic magical cross-talk.
