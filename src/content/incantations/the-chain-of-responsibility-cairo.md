---
title: "The Chain of Responsibility"
description: "Passing a STARK proof through sequential validation filters."
type: cairo
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Flow"
formula: |2
  #[derive(Drop)]
  enum HandlerResult {
      Passed: felt252,
      Failed,
  }
  trait IHandler<T> { fn handle(self: @T, proof: felt252) -> HandlerResult; }
  
  #[derive(Copy, Drop)]
  struct SignatureHandler {}
  impl SigHandlerImpl of IHandler<SignatureHandler> {
      fn handle(self: @SignatureHandler, proof: felt252) -> HandlerResult {
          if proof != 0 { HandlerResult::Passed(proof) } else { HandlerResult::Failed }
      }
  }
tags: [cairo, design-pattern, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A sequence of mystical wards, where each decides whether to bless the proof or pass it to the next authority.
