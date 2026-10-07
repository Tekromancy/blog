---
title: Facade
description: Providing a single, elegant incantation to hide the grotesque complexity of century-long magic.
type: raku
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Masking"
formula: |2
  class LeyLineRouter {
      method tap-line() { say "-> Tapping into the local subterranean ley lines." }
  }

  class TemporalShifter {
      method shift(Int $years) { say "-> Shifting the localized flow of time by $years years." }
  }

  class SoulBinder {
      method bind() { say "-> Binding the spell's intent to the caster's enduring soul." }
  }

  class HundredYearFacade {
      has LeyLineRouter $!router .= new;
      has TemporalShifter $!shifter .= new;
      has SoulBinder $!binder .= new;
      
      method invoke-century-spell() {
          say "Initiating the simplified high-magic sequence...";
          $!router.tap-line();
          $!shifter.shift(100);
          $!binder.bind();
          say "The Hundred-Year Spell has successfully crystallized.";
      }
  }

  my $facade = HundredYearFacade.new;
  $facade.invoke-century-spell();
tags: [structural, facade, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The underlying systems of a Hundred-Year Spell—ley line tapping, temporal dilation, soul binding—are tremendously complex and prone to catastrophic failure if mismanaged. The Facade pattern offers the apprentice a simplified, safe interface. Behind the single method call, the arcane complexity is orchestrated flawlessly.
