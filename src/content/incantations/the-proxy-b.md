---
title: "The Proxy"
description: "A shadowy stand-in guarding access to a resource of ancient power."
type: b
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Warding
formula: |
  /* The forbidden vault */
  ancient_vault_access() {
      putchar('G'); putchar('O'); putchar('L'); putchar('D');
  }
  
  /* The Proxy */
  ext is_authorized;
  
  proxy_access() {
      if (is_authorized) {
          ancient_vault_access();
      } else {
          putchar('N'); putchar('O');
      }
  }
  
  seeker_attempt() {
      is_authorized = 0;
      proxy_access(); /* NO */
      
      is_authorized = 1;
      proxy_access(); /* GOLD */
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
