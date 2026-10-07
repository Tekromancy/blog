---
title: The Primordial Proxy
description: Placing an ethereal gatekeeper before an ancient, resource-heavy grimoire.
type: c
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  typedef struct Grimoire Grimoire;
  struct Grimoire {
      void (*read)(Grimoire* self);
  };

  // The Real Subject
  typedef struct {
      Grimoire base;
  } HeavyGrimoire;

  void real_read(Grimoire* self) {
      printf("Reading forbidden knowledge from the Heavy Grimoire.\n");
  }

  HeavyGrimoire* create_heavy_grimoire(void) {
      printf("... Allocating immense cosmic memory ...\n");
      HeavyGrimoire* hg = malloc(sizeof(HeavyGrimoire));
      hg->base.read = real_read;
      return hg;
  }

  // The Proxy
  typedef struct {
      Grimoire base;
      HeavyGrimoire* real_subject;
  } GrimoireProxy;

  void proxy_read(Grimoire* self) {
      GrimoireProxy* proxy = (GrimoireProxy*)self;
      if (!proxy->real_subject) {
          proxy->real_subject = create_heavy_grimoire();
      }
      proxy->real_subject->base.read((Grimoire*)proxy->real_subject);
  }

  Grimoire* create_proxy(void) {
      GrimoireProxy* p = malloc(sizeof(GrimoireProxy));
      p->base.read = proxy_read;
      p->real_subject = NULL; // Lazy initialization
      return (Grimoire*)p;
  }

  int main() {
      Grimoire* book = create_proxy();
      printf("Proxy created, no heavy memory used yet.\n");
      
      book->read(book); // triggers initialization
      book->read(book); // uses initialized subject
      
      GrimoireProxy* proxy = (GrimoireProxy*)book;
      if (proxy->real_subject) free(proxy->real_subject);
      free(book);
      return 0;
  }
tags: [c, structural, proxy, lazy-evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Primordial Proxy stands as a guardian between the volatile heavy constructs and the outer code logic. It may govern access, defer initialization through lazy-loading, or log access. The true subject is only instantiated when strictly necessary.
