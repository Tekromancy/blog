---
title: The Proxy
description: Providing a surrogate or placeholder to control access to forbidden arcane knowledge.
type: typescript
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Control"
formula: |2
  interface Grimoire {
    read(): string;
  }
  
  class ForbiddenGrimoire implements Grimoire {
    read() { return "Revealing the secrets of the digital void."; }
  }
  
  class GrimoireProxy implements Grimoire {
    private realGrimoire: ForbiddenGrimoire | null = null;
    constructor(private userRole: string) {}
    
    read() {
      if (this.userRole !== 'Archmage') {
        return "Access Denied. Insufficient clearance.";
      }
      if (!this.realGrimoire) {
        this.realGrimoire = new ForbiddenGrimoire();
      }
      return this.realGrimoire.read();
    }
  }
tags: [structural, typescript, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy pattern provides a substitute for another object to control access, delay initialization, or provide logging. By wrapping the Forbidden Grimoire in a typed proxy, we enforce strict security classifications, ensuring only mages of proper rank can execute the heavy instantiation and reading.
