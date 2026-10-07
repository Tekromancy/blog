---
title: The Primordial Chain of Responsibility
description: Passing requests down a hierarchical sequence of elemental guardians.
type: c
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Guardian Logic"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  typedef struct Guardian Guardian;
  struct Guardian {
      Guardian* next;
      void (*handle_intrusion)(Guardian* self, int threat_level);
  };

  void handle_low_threat(Guardian* self, int threat_level) {
      if (threat_level <= 10) {
          printf("Low threat neutralized by Outer Ward.\n");
      } else if (self->next) {
          self->next->handle_intrusion(self->next, threat_level);
      }
  }

  void handle_high_threat(Guardian* self, int threat_level) {
      if (threat_level > 10) {
          printf("High threat banished by Inner Sanctum Guardian.\n");
      } else if (self->next) {
          self->next->handle_intrusion(self->next, threat_level);
      }
  }

  Guardian* create_guardian(void (*handler)(Guardian*, int)) {
      Guardian* g = malloc(sizeof(Guardian));
      g->next = NULL;
      g->handle_intrusion = handler;
      return g;
  }

  int main() {
      Guardian* outer = create_guardian(handle_low_threat);
      Guardian* inner = create_guardian(handle_high_threat);
      
      outer->next = inner; // Chain them
      
      printf("Incoming threat level 5:\n");
      outer->handle_intrusion(outer, 5);
      
      printf("Incoming threat level 20:\n");
      outer->handle_intrusion(outer, 20);
      
      free(outer);
      free(inner);
      return 0;
  }
tags: [c, behavioral, chain-of-responsibility, filtering]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a threat breeches the dimensional threshold, it cascades through the Primordial Chain of Responsibility. Instead of rigid `if-else` blocks bound to a single locus, each node independently decides whether to neutralize the anomaly or defer it deeper into the matrix.
