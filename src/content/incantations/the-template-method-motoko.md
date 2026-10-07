---
title: The Template Method Hex
description: Defining the immutable skeleton of a grand ritual, deferring exact ingredients to subclasses.
type: motoko
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Actor Model Hexes"
formula: |2
  module TemplateMethod {
    public type PotionRitual = {
      brew : () -> Text;
      addPrimaryIngredient : () -> Text;
      addCatalyst : () -> Text;
    };
  
    // In Motoko, we use object composition or higher-order functions 
    // to simulate Template Method inheritance.
    public class AbstractRitual(
      primary : () -> Text,
      catalyst : () -> Text
    ) {
      public func brew() : Text {
        "Boiling water... " # primary() # " ... " # catalyst() # " ... Potion ready!";
      };
    };
  
    public class HealingPotion() {
      public func getRitual() : AbstractRitual {
        AbstractRitual(
          func() : Text { "Adding Troll Blood" },
          func() : Text { "Adding Sun Drop" }
        )
      };
    };
  
    public actor Alchemist {
      public func craftHealing() : async Text {
        let potion = HealingPotion().getRitual();
        potion.brew();
      };
    };
  }
tags: [motoko, behavioral, template-method, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method Hex outlines the immutable steps of an algorithm—boiling water, adding ingredients, bottling—but delegates the exact implementation of the primary ingredients and catalysts to specific instances. Here, Motoko's higher-order functions beautifully replicate inheritance.
