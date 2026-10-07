---
title: The Coven Nexus
description: Centralize chaotic communication between magical entities to prevent a tangled web of dependencies.
type: dart
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Mind Link"
formula: |2
  abstract class Mediator {
    void notify(Object sender, String event);
  }

  class CovenNexus implements Mediator {
    late Warlock warlock;
    late Witch witch;

    @override
    void notify(Object sender, String event) {
      if (event == 'Ritual Started') {
        print('Nexus routing mana to Witch.');
        witch.channel();
      }
    }
  }

  class Warlock {
    final Mediator mediator;
    Warlock(this.mediator);

    void startRitual() {
      print('Warlock bleeds into the circle.');
      mediator.notify(this, 'Ritual Started');
    }
  }

  class Witch {
    void channel() => print('Witch completes the summoning!');
  }

  void main() {
    final nexus = CovenNexus();
    final warlock = Warlock(nexus);
    final witch = Witch();

    nexus.warlock = warlock;
    nexus.witch = witch;

    warlock.startRitual();
  }
tags: [dart, mediator, communication, nexus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When dozens of casters scream at each other across the battlefield, chaos ensues. The Mediator acts as the Coven Nexus—a telepathic hub. Casters speak only to the Nexus, and the Nexus routes the esoteric intent to the correct targets, un-tangling the mesh.
