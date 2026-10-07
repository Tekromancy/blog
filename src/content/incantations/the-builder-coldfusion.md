---
title: The Builder of the Binding Circles
description: Construct complex mystical artifacts step by step through successive tag-wards.
type: coldfusion
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Artifice"
formula: |2
  component name="GolemBuilder" {
      variables.golem = { head: "", body: "", limbs: "" };

      public GolemBuilder function init() {
          return this;
      }

      public GolemBuilder function bindHead(string material) {
          variables.golem.head = arguments.material;
          return this;
      }

      public GolemBuilder function bindBody(string material) {
          variables.golem.body = arguments.material;
          return this;
      }

      public GolemBuilder function bindLimbs(string material) {
          variables.golem.limbs = arguments.material;
          return this;
      }

      public struct function awaken() {
          return variables.golem;
      }
  }

  // Client
  builder = new GolemBuilder();
  myGolem = builder.bindHead("Clay")
                   .bindBody("Stone")
                   .bindLimbs("Iron")
                   .awaken();
tags: [builder, coldfusion, binding-circles, construction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder separates the construction of a complex, layered ward from its representation. By invoking binding tags in sequence, the alchemist assembles golems and constructs safely before finally breathing life into them with the `awaken` invocation.
