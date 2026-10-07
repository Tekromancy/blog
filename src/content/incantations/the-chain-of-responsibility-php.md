---
title: "The Chain of Responsibility Conduit"
description: "Pass a chaotic request along a chain of handlers until one captures it."
type: php
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Channeling"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  abstract class MiddlewareHandler {
      private ?MiddlewareHandler $next = null;

      public function setNext(MiddlewareHandler $handler): MiddlewareHandler {
          $this->next = $handler;
          return $handler;
      }

      public function handle(array $request): ?string {
          if ($this->next) {
              return $this->next->handle($request);
          }
          return null;
      }
  }

  class FirewallHandler extends MiddlewareHandler {
      public function handle(array $request): ?string {
          if (isset($request['malicious'])) {
              return "Firewall Blocked Chaos!";
          }
          return parent::handle($request);
      }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility Conduit

In the realm of HTTP chaos, incoming requests are bombarded by myriad filters, wards, and authenticators. The Chain of Responsibility links these handlers dynamically. If the `FirewallHandler` cannot process the chaos, it passes the burden along the conduit until a capable ward intervenes.
