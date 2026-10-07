---
title: "The Chain of Responsibility Incantation in Carbon"
description: "Pass a request along a chain of handlers until one finally resolves it."
type: carbon
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Cascading"
formula: |2
  package ChainOfResponsibility api;

  class Request {
    var severity: i32;
    var payload: String;
  }

  interface Handler {
    fn Handle[me: Self](req: Request) -> String;
    fn SetNext[addr me: Self*>(next_handler: Handler*);
  }

  class BaseHandler {
    var next: Handler*;

    impl as Handler {
      fn Handle[me: Self](req: Request) -> String {
        if (me.next != null) {
          return (*me.next).Handle(req);
        }
        return "Unhandled";
      }
      fn SetNext[addr me: Self*>(next_handler: Handler*) {
        (*me).next = next_handler;
      }
    }
  }

  class FirewallHandler extends BaseHandler {
    fn Handle[me: Self](req: Request) -> String {
      if (req.severity <= 10) {
        return "Firewall blocked: " + req.payload;
      }
      return BaseHandler.Handle(req);
    }
  }
tags: [behavioral, carbon, delegation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility: The Cascading Wards

When a malicious packet strikes the perimeter, it does not hit a single monolithic defense. It hits the Chain of Responsibility. This pattern strings multiple `Handler` objects together, allowing each a chance to process or deflect the request.

In Carbon, we implement this as a linked list of interface pointers. If the `FirewallHandler` deems the severity too low, it intercepts it. If not, the packet cascades to the next ward in the chain. This decoupled architecture allows dynamic restructuring of defenses during a live cyber-breach.
