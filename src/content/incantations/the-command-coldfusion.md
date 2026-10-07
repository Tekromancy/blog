---
title: The Command of the Sealed Scroll
description: Encapsulate a magical incantation as an object, allowing it to be delayed, queued, or undone.
type: coldfusion
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Runecraft"
formula: |2
  interface name="ISpellCommand" {
      public void execute();
  }

  component name="Target" {
      public void function ignite() { writeOutput("Target bursts into flames!"); }
  }

  component name="IgniteSpell" implements="ISpellCommand" {
      variables.target = "";

      public IgniteSpell function init(Target t) {
          variables.target = arguments.t;
          return this;
      }

      public void function execute() {
          variables.target.ignite();
      }
  }

  // Invoker
  component name="Wand" {
      variables.spell = null;
      public void function bindSpell(ISpellCommand s) { variables.spell = s; }
      public void function wave() { variables.spell.execute(); }
  }
tags: [command, coldfusion, scrolls, encapsulation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By sealing an incantation into a scroll (or Command object), an alchemist separates the request for magic from its execution. Wands can be bound to different spells on the fly, storing up power to unleash all at once.
