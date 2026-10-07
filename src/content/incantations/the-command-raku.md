---
title: Command
description: Encapsulating arcane instructions to be executed, or undone, decades after casting.
type: raku
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Domination"
formula: |2
  class Artifact {
      method activate() { say "The ancient artifact hums with power." }
      method deactivate() { say "The artifact goes dormant." }
  }

  role SpellCommand {
      method execute() { ... }
      method undo() { ... }
  }

  class AwakenArtifactCommand does SpellCommand {
      has Artifact $.artifact;
      
      method execute() { $!artifact.activate() }
      method undo() { $!artifact.deactivate() }
  }

  class TimeTrigger {
      has SpellCommand @.history;
      
      method trigger(SpellCommand $cmd) {
          $cmd.execute();
          @!history.push($cmd);
      }
      
      method rollback() {
          if @!history {
              my $cmd = @!history.pop();
              $cmd.undo();
          }
      }
  }

  my $artifact = Artifact.new;
  my $awaken = AwakenArtifactCommand.new(artifact => $artifact);
  my $trigger = TimeTrigger.new;

  say "A century passes. The stars align.";
  $trigger.trigger($awaken);

  say "The magic becomes unstable. Reversing flow...";
  $trigger.rollback();
tags: [behavioral, command, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To control an enchantment over a hundred-year span, one cannot simply rely on raw will. The Command pattern encapsulates an action and its parameters into a discrete, storable object. This allows spells to be queued, delayed, or even undone decades after the original caster has turned to dust.
