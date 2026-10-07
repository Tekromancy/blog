---
title: "The Visitor Intrusion"
description: "Separate an algorithm from the object structure on which it operates."
type: php
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Evocation // Intrusion"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  interface Component {
      public function accept(Visitor $visitor): void;
  }

  class EntityA implements Component {
      public function accept(Visitor $visitor): void { $visitor->visitEntityA($this); }
      public function exclusiveMethodA(): string { return "A"; }
  }

  interface Visitor {
      public function visitEntityA(EntityA $element): void;
  }

  class ChaosExporter implements Visitor {
      public function visitEntityA(EntityA $element): void {
          echo "Exporting chaos: " . $element->exclusiveMethodA() . "\n";
      }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Visitor Intrusion

Adding operations to deeply entrenched legacy structures risks invoking the Elephant's Curse across the codebase. The Visitor pattern acts as a phantom intrusion, walking across the object graph and operating upon the nodes without requiring any structural changes to the nodes themselves.
