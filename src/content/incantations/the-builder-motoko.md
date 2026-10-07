---
title: The Builder Hex
description: Incrementally forging complex actor states through isolated incantation steps.
type: motoko
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Actor Model Hexes"
formula: |2
  module Builder {
    public type Golem = {
      head : Text;
      body : Text;
      limbs : Text;
    };
  
    public class GolemBuilder() {
      var headState : Text = "Formless Head";
      var bodyState : Text = "Formless Body";
      var limbsState : Text = "Formless Limbs";
  
      public func setHead(head : Text) : () {
        headState := head;
      };
  
      public func setBody(body : Text) : () {
        bodyState := body;
      };
  
      public func setLimbs(limbs : Text) : () {
        limbsState := limbs;
      };
  
      public func awaken() : Golem {
        {
          head = headState;
          body = bodyState;
          limbs = limbsState;
        }
      };
    };
  
    public actor GolemForge {
      public func forgeIronGolem() : async Golem {
        let builder = GolemBuilder();
        builder.setHead("Iron Helm");
        builder.setBody("Iron Chassis");
        builder.setLimbs("Iron Gauntlets");
        builder.awaken();
      };
    };
  }
tags: [motoko, creational, builder, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder Hex isolates the construction of a complex struct or object from its representation. Here, an actor serves as the Director (the `GolemForge`), using the `GolemBuilder` to incrementally weave parts of a golem before fully awakening it.
