---
title: Mediator
description: Centralize chaotic communication among rival familiars to prevent escalating arcane feedback loops.
type: d
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Familiar Coordination"
formula: |2
  interface ICovenMediator { void notify(Familiar sender, string event); }

  abstract class Familiar {
      protected ICovenMediator mediator;
      this(ICovenMediator m) { mediator = m; }
  }

  class Raven : Familiar {
      this(ICovenMediator m) { super(m); }
      void caw() { mediator.notify(this, "Danger"); }
  }
tags: [behavioral, mediator, dlang, coordination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Restricts direct interaction between chaotic familiars, forcing them through a central nexus.
