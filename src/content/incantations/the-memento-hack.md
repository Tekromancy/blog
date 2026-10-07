---
title: The Temporal Memento
description: Capture and restore the internal state of a profile node.
type: hack
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Reversal"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Memento;

  class ProfileState {
    public function __construct(public string $status) {}
  }

  class ProfileNode {
    private string $status = "Active";

    public function setStatus(string $status): void { 
      $this->status = $status; 
    }

    public function saveTemporalState(): ProfileState { 
      return new ProfileState($this->status); 
    }

    public function restore(ProfileState $state): void { 
      $this->status = $state->status; 
    }
  }

  class StateCaretaker {
    private vec<ProfileState> $history = vec[];

    public function backup(ProfileNode $node): void {
      $this->history[] = $node->saveTemporalState();
    }

    public function undo(ProfileNode $node): void {
      if (\HH\Lib\C\is_empty($this->history)) { return; }
      
      $lastState = \HH\Lib\Vec\drop($this->history, \HH\Lib\C\count($this->history) - 1)[0];
      $this->history = \HH\Lib\Vec\take($this->history, \HH\Lib\C\count($this->history) - 1);
      
      $node->restore($lastState);
    }
  }
tags: [hack, memento, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### Winding Back the Clock

A compromised node often requires immediate sanitization, but restoring a profile to a pre-infection state is difficult without violating encapsulation. The **Memento** pattern extracts a frozen snapshot (`ProfileState`) of the node and stores it in an isolated Caretaker.

If a destructive operation damages the entity's standing in the social graph, Chronomancy allows us to restore the precise state without exposing the Node's internal setter mutators.
