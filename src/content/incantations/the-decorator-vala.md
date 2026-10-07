---
title: "The Decorator: Augmenting the Shell"
description: "Attach additional responsibilities to an object dynamically."
type: vala
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Augmentation"
formula: |2
  public interface GNOMEArtifice.Exosuit : Object {
      public abstract string get_description();
      public abstract int get_power_level();
  }
  
  public class GNOMEArtifice.BasicExosuit : Object, Exosuit {
      public string get_description() {
          return "Standard Issue Exosuit";
      }
  
      public int get_power_level() {
          return 100;
      }
  }
  
  public abstract class GNOMEArtifice.ExosuitDecorator : Object, Exosuit {
      protected Exosuit core_suit;
  
      public ExosuitDecorator(Exosuit core_suit) {
          this.core_suit = core_suit;
      }
  
      public virtual string get_description() {
          return this.core_suit.get_description();
      }
  
      public virtual int get_power_level() {
          return this.core_suit.get_power_level();
      }
  }
  
  public class GNOMEArtifice.JetpackAugment : ExosuitDecorator {
      public JetpackAugment(Exosuit core_suit) {
          base(core_suit);
      }
  
      public override string get_description() {
          return this.core_suit.get_description() + " with Jetpack";
      }
  
      public override int get_power_level() {
          return this.core_suit.get_power_level() + 50;
      }
  }
tags: [Vala, GObject, Structural, Decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A raw, standard-issue Exosuit is rarely sufficient for deep-net diving or hazardous physical encounters. Rather than rewriting the matrix of the suit for every possible combination of upgrades, the Decorator pattern allows you to dynamically layer enhancements. A Jetpack Augment wraps around the core suit, intercepting the structural queries and amplifying the results. The GNOME Artifice thus scales its power flexibly and cleanly.
