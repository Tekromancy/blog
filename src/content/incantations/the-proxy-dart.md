---
title: The Astral Projection
description: Control access to an underlying magical entity with a surrogate.
type: dart
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  abstract class Grimoire {
    void readForbiddenKnowledge();
  }

  class RealGrimoire implements Grimoire {
    RealGrimoire() {
      print('Materializing the heavy, cursed tome... (Costly)');
    }

    @override
    void readForbiddenKnowledge() => print('Reading secrets of the abyss...');
  }

  class GrimoireProxy implements Grimoire {
    RealGrimoire? _realGrimoire;
    final bool hasClearance;

    GrimoireProxy({this.hasClearance = false});

    @override
    void readForbiddenKnowledge() {
      if (!hasClearance) {
        print('Access Denied: You lack the requisite soul purity.');
        return;
      }
      _realGrimoire ??= RealGrimoire(); // Lazy loading
      _realGrimoire!.readForbiddenKnowledge();
    }
  }

  void main() {
    final proxy = GrimoireProxy(hasClearance: true);
    print('Proxy created. Tome not yet loaded.');
    proxy.readForbiddenKnowledge(); // Instantiates and reads
  }
tags: [dart, proxy, security, lazy-loading, illusion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Invoking a cursed grimoire into memory is incredibly expensive and dangerous. The Proxy provides an Astral Projection of the object—handling security checks, caching, or lazy-loading before deciding if the true entity should be drawn across the veil.
