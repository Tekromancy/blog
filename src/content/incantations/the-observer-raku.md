---
title: Observer
description: Alerting bound familiars and wardens when the century spell shifts its phase.
type: raku
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  role Watcher {
      method update(Str $event) { ... }
  }

  class Familiar does Watcher {
      has Str $.name;
      method update(Str $event) {
          say "Familiar $!name senses a shift: $event";
      }
  }

  class Warden does Watcher {
      has Str $.title;
      method update(Str $event) {
          say "Warden $!title records the arcane disturbance: $event";
      }
  }

  class CenturySpell {
      has Watcher @.watchers;
      has Str $!phase = "Dormant";
      
      method attach(Watcher $w) { @!watchers.push($w) }
      
      method change-phase(Str $new-phase) {
          $!phase = $new-phase;
          say "\nThe Spell phase changes to: $!phase";
          self.notify-all();
      }
      
      method notify-all() {
          for @!watchers -> $w {
              $w.update($!phase);
          }
      }
  }

  my $spell = CenturySpell.new;
  $spell.attach(Familiar.new(name => "Grimalkin"));
  $spell.attach(Warden.new(title => "Keeper of the East Tower"));

  $spell.change-phase("Awakening");
  $spell.change-phase("Full Manifestation");
tags: [behavioral, observer, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The caster of a Hundred-Year Spell will likely not survive to see its conclusion. Therefore, they must rely on familiars, stone wardens, and successor mages to monitor it. The Observer pattern allows the spell to automatically broadcast changes in its state to any number of subscribed watchers, ensuring an immediate response to magical fluctuations.
