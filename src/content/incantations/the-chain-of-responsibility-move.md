---
title: The Chain of Responsibility for Spell Requests
description: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request in Move.
type: move
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Bureaucracy"
formula: |2
  module arcane::chain_of_responsibility {
      struct Request has drop {
          level: u8,
          handled: bool,
      }
  
      public fun create_request(level: u8): Request {
          Request { level, handled: false }
      }
  
      public fun apprentice_handler(req: &mut Request) {
          if (!req.handled && req.level <= 1) {
              req.handled = true;
          }
      }
  
      public fun mage_handler(req: &mut Request) {
          if (!req.handled && req.level <= 5) {
              req.handled = true;
          }
      }
  
      public fun archmage_handler(req: &mut Request) {
          if (!req.handled) {
              req.handled = true;
          }
      }
  }
tags: [behavioral, chain-of-responsibility, move, handlers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
