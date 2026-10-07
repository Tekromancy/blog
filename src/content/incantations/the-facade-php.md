---
title: "The Facade Veil"
description: "Conceal the horrific legacy systems behind a simple, unified veil."
type: php
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Masking"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  class AncientAuthSystem { public function check(string $u, string $p): bool { return true; } }
  class AncientSessionManager { public function init(): void {} }
  class AncientLog Ritual { public function scribe(string $msg): void {} }

  class GatewayFacade {
      private AncientAuthSystem $auth;
      private AncientSessionManager $session;
      private AncientLogRitual $logger;

      public function __construct() {
          $this->auth = new AncientAuthSystem();
          $this->session = new AncientSessionManager();
          $this->logger = new AncientLogRitual();
      }

      public function enterGateway(string $user, string $pass): bool {
          if ($this->auth->check($user, $pass)) {
              $this->session->init();
              $this->logger->scribe("$user passed the veil.");
              return true;
          }
          return false;
      }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Facade Veil

Surviving the chaotic hypertext aether means not exposing one's mind to the horrific spaghetti code of legacy PHP. The Facade provides a clean, elegant Gateway that obscures the writhing mass of ancient authentication and session management systems beneath.
