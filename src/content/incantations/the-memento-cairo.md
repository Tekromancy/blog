---
title: "The Memento"
description: "Capturing and restoring the STARK VM state."
type: cairo
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Restoration"
formula: |2
  #[derive(Copy, Drop)]
  struct VmState { pc: u32, ap: u32, fp: u32 }
  
  #[derive(Copy, Drop)]
  struct Memento { state: VmState }
  
  #[derive(Copy, Drop)]
  struct Vm { state: VmState }
  trait IVm {
      fn save(self: @Vm) -> Memento;
      fn restore(ref self: Vm, memento: Memento);
  }
  
  impl VmImpl of IVm {
      fn save(self: @Vm) -> Memento { Memento { state: *self.state } }
      fn restore(ref self: Vm, memento: Memento) { self.state = memento.state; }
  }
tags: [cairo, design-pattern, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A chronological anchor, allowing the provers to step back in time to a previously captured state matrix.
