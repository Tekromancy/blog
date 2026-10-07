---
title: "The Bridge: Decoupling the Rune from the Blade"
description: "Decouple an abstraction from its implementation so that the two can vary independently."
type: vala
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Alteration // Decoupling"
formula: |2
  public interface GNOMEArtifice.Enchantment : Object {
      public abstract void apply();
  }
  
  public class GNOMEArtifice.NeonGlow : Object, Enchantment {
      public void apply() {
          print("Bathing the construct in harsh neon light. ");
      }
  }
  
  public class GNOMEArtifice.ShadowCloak : Object, Enchantment {
      public void apply() {
          print("Wreathing the construct in void-shadow. ");
      }
  }
  
  public abstract class GNOMEArtifice.CyberWeapon : Object {
      protected Enchantment enchantment;
  
      public CyberWeapon(Enchantment enchantment) {
          this.enchantment = enchantment;
      }
  
      public abstract void strike();
  }
  
  public class GNOMEArtifice.MonomolecularBlade : CyberWeapon {
      public MonomolecularBlade(Enchantment enchantment) {
          base(enchantment);
      }
  
      public override void strike() {
          this.enchantment.apply();
          print("The blade slices through data and matter alike!\n");
      }
  }
tags: [Vala, GObject, Structural, Bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the armories of the Grid, maintaining a separate class for every combination of weapon and enchantment—a Neon Monomolecular Blade, a Shadow Cloaked Monomolecular Blade—leads to a combinatorial explosion of code. The Bridge pattern severs this tangled hierarchy. By extracting the Enchantment into its own interface, the CyberWeapon focuses merely on its physical strike, delegating the magical effects. This allows the GNOME Artifice to swap runic cores into physical armaments dynamically.
