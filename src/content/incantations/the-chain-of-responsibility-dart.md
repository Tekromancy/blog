---
title: The Leyline Chain
description: Pass a magical request along a chain of wards until one resolves it.
type: dart
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
formula: |2
  abstract class Ward {
    Ward? _next;

    void setNext(Ward ward) => _next = ward;

    void handleAttack(int power) {
      if (canDeflect(power)) {
        print('${runtimeType} deflected the attack of power $power!');
      } else if (_next != null) {
        print('${runtimeType} failed. Passing to next ward...');
        _next!.handleAttack(power);
      } else {
        print('All wards breached. You take $power damage!');
      }
    }

    bool canDeflect(int power);
  }

  class ShieldCharm extends Ward {
    @override
    bool canDeflect(int power) => power <= 10;
  }

  class AegisField extends Ward {
    @override
    bool canDeflect(int power) => power <= 50;
  }

  class VoidBarrier extends Ward {
    @override
    bool canDeflect(int power) => power <= 100;
  }

  void main() {
    final chain = ShieldCharm()
      ..setNext(AegisField()
        ..setNext(VoidBarrier()));

    chain.handleAttack(45);
    chain.handleAttack(150);
  }
tags: [dart, chain-of-responsibility, middleware, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a chaotic attack hits your system, you shouldn't hardcode exactly which defense triggers. You construct a chain of Wards. Each ward inspects the incoming anomaly; if it cannot handle the payload, it channels it down the leyline to the next defender.
