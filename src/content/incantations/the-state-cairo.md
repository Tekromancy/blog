---
title: "The State"
description: "Transitioning between different phases of the FRI protocol."
type: cairo
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  #[derive(Drop)]
  enum FriState {
      Commit,
      Query,
      Done,
  }
  
  #[derive(Drop)]
  struct FriProtocol { state: FriState }
  
  trait IFri { fn next_step(ref self: FriProtocol); }
  
  impl FriImpl of IFri {
      fn next_step(ref self: FriProtocol) {
          self.state = match self.state {
              FriState::Commit => FriState::Query,
              FriState::Query => FriState::Done,
              FriState::Done => FriState::Done,
          };
      }
  }
tags: [cairo, design-pattern, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The prover’s behavior morphs completely as it transitions from commitment to query phases.
