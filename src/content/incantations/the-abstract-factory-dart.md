---
title: The Cross-Realm Forge
description: Conjure entire families of related mystical UI artifacts without binding your soul to their concrete classes.
type: dart
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  abstract class PortalFactory {
    Rune createRune();
    Sigil createSigil();
  }

  class NetherPortalFactory implements PortalFactory {
    @override
    Rune createRune() => NetherRune();
    @override
    Sigil createSigil() => NetherSigil();
  }

  class AetherPortalFactory implements PortalFactory {
    @override
    Rune createRune() => AetherRune();
    @override
    Sigil createSigil() => AetherSigil();
  }

  abstract class Rune {
    void glow();
  }

  abstract class Sigil {
    void resonate();
  }

  class NetherRune implements Rune {
    @override
    void glow() => print('Eerie purple glow.');
  }

  class NetherSigil implements Sigil {
    @override
    void resonate() => print('Deep bass hum.');
  }

  class AetherRune implements Rune {
    @override
    void glow() => print('Blinding white light.');
  }

  class AetherSigil implements Sigil {
    @override
    void resonate() => print('High-pitched chime.');
  }

  void main() {
    PortalFactory factory = AetherPortalFactory();
    final rune = factory.createRune();
    rune.glow();
  }
tags: [dart, flutter, ui-magic, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the shifting realms of UI magic, consistency is the key to preventing planar collapse. The Abstract Factory ensures that when you conjure a rune of Aether, its accompanying sigils will harmonize, rather than tear a rift in the widget tree.
