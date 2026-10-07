---
title: Chain of Responsibility
description: Passing the magical feedback of a century spell through a lineage of protective wards.
type: raku
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Dissipation"
formula: |2
  class MagicalFeedback {
      has Int $.intensity is rw;
      has Str $.nature;
  }

  role WardHandler {
      has WardHandler $.next-ward is rw;
      
      method handle-feedback(MagicalFeedback $f) { ... }
  }

  class PhysicalWard does WardHandler {
      method handle-feedback(MagicalFeedback $f) {
          if $f.nature eq 'Kinetic' {
              say "PhysicalWard absorbs the kinetic feedback (Intensity: {$f.intensity}).";
              $f.intensity = 0;
          } elsif $.next-ward {
              $.next-ward.handle-feedback($f);
          }
      }
  }

  class TemporalWard does WardHandler {
      method handle-feedback(MagicalFeedback $f) {
          if $f.nature eq 'Temporal' {
              say "TemporalWard absorbs the time-shifted feedback (Intensity: {$f.intensity}).";
              $f.intensity = 0;
          } elsif $.next-ward {
              $.next-ward.handle-feedback($f);
          }
      }
  }

  class ArchmageWard does WardHandler {
      method handle-feedback(MagicalFeedback $f) {
          if $f.intensity > 0 {
              say "The Archmage personally dissipates the remaining {$f.nature} feedback.";
              $f.intensity = 0;
          }
      }
  }

  my $archmage = ArchmageWard.new;
  my $temporal = TemporalWard.new(next-ward => $archmage);
  my $physical = PhysicalWard.new(next-ward => $temporal);

  my $feedback = MagicalFeedback.new(intensity => 9000, nature => 'Temporal');
  $physical.handle-feedback($feedback);
tags: [behavioral, chain-of-responsibility, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When maintaining a Hundred-Year Spell, magical feedback is inevitable and often deadly. By establishing a Chain of Responsibility, the feedback is passed through a sequence of specialized wards. Each ward either handles the specific type of resonance it was designed for or passes it along the chain, protecting the caster from direct impact.
