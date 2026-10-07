---
title: "The Observer Resonance"
description: "Define a one-to-many dependency so when one object changes state, all its dependents are notified."
type: php
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Broadcasting
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  class EventNexus implements \SplSubject {
      private \SplObjectStorage $observers;
      public string $state = '';
  
      public function __construct() { $this->observers = new \SplObjectStorage(); }
      public function attach(\SplObserver $observer): void { $this->observers->attach($observer); }
      public function detach(\SplObserver $observer): void { $this->observers->detach($observer); }
      public function notify(): void {
          foreach ($this->observers as $observer) { $observer->update($this); }
      }
      public function triggerChaos(): void {
          $this->state = 'Chaos Unleashed';
          $this->notify();
      }
  }
  
  class ChaosWatcher implements \SplObserver {
      public function update(\SplSubject $subject): void {
          if ($subject instanceof EventNexus) {
              echo "Watcher noticed: " . $subject->state . "\n";
          }
      }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer Resonance

Instead of tightly coupled modules constantly polling for state changes, they use the Observer Resonance. Utilizing PHP's built-in `SplSubject` and `SplObserver`, events dynamically broadcast across the aether to whatever entities are listening.
