---
title: The Primordial Mediator
description: A centralized ethereal nexus to synchronize chaos between warring artifacts.
type: c
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  // Forward declarations
  typedef struct Artifact Artifact;
  typedef struct Mediator Mediator;

  struct Mediator {
      void (*notify)(Mediator* self, Artifact* sender, const char* event);
  };

  struct Artifact {
      char name[32];
      Mediator* mediator;
  };

  void artifact_trigger(Artifact* self, const char* event) {
      printf("Artifact [%s] triggers %s\n", self->name, event);
      if (self->mediator) {
          self->mediator->notify(self->mediator, self, event);
      }
  }

  // Specific Mediator implementation
  typedef struct {
      Mediator base;
      Artifact* sword;
      Artifact* shield;
  } NexusMediator;

  void nexus_notify(Mediator* self, Artifact* sender, const char* event) {
      NexusMediator* nexus = (NexusMediator*)self;
      if (sender == nexus->sword) {
          printf("Nexus: Sword attacked, commanding Shield to brace!\n");
      } else if (sender == nexus->shield) {
          printf("Nexus: Shield shattered, commanding Sword to enrage!\n");
      }
  }

  int main() {
      NexusMediator nexus;
      nexus.base.notify = nexus_notify;

      Artifact sword = { "Sun Blade", (Mediator*)&nexus };
      Artifact shield = { "Moon Aegis", (Mediator*)&nexus };
      
      nexus.sword = &sword;
      nexus.shield = &shield;

      artifact_trigger(&sword, "strike");
      artifact_trigger(&shield, "break");

      return 0;
  }
tags: [c, behavioral, mediator, communication]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When independent familiars and artifacts threaten to entangle their logic threads, the Primordial Mediator acts as the singular point of synchronization. It commands the field so that individual artifacts remain blissfully unaware of each other's complex states.
