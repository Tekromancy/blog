---
title: The Primordial Flyweight
description: Conserving mana by sharing intrinsic magical states across vast summoned armies.
type: c
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Army Binding"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>
  #include <string.h>

  // Intrinsic state (shared)
  typedef struct {
      char model_name[32];
      int max_health;
      int base_damage;
  } SkeletonModel;

  // Extrinsic state (unique)
  typedef struct {
      SkeletonModel* model;
      int x_pos;
      int y_pos;
      int current_health;
  } Skeleton;

  // Flyweight Factory
  static SkeletonModel* standard_model = NULL;

  SkeletonModel* get_skeleton_model(void) {
      if (!standard_model) {
          standard_model = malloc(sizeof(SkeletonModel));
          strcpy(standard_model->model_name, "Bone Warrior");
          standard_model->max_health = 100;
          standard_model->base_damage = 15;
          printf("Loaded heavy intrinsic model into memory.\n");
      }
      return standard_model;
  }

  Skeleton create_skeleton(int x, int y) {
      Skeleton s;
      s.model = get_skeleton_model();
      s.x_pos = x;
      s.y_pos = y;
      s.current_health = s.model->max_health;
      return s;
  }

  int main() {
      Skeleton army[3];
      for (int i = 0; i < 3; i++) {
          army[i] = create_skeleton(i * 10, i * 5);
          printf("Skeleton at (%d, %d) ready.\n", army[i].x_pos, army[i].y_pos);
      }
      free(standard_model);
      return 0;
  }
tags: [c, structural, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When legions of undead are bound to the material plane, storing the base mesh and soul-matrix for each entity rapidly exhausts the memory ether. The Primordial Flyweight shares these intrinsic matrices, tracking only the temporal coordinates of the vessel.
