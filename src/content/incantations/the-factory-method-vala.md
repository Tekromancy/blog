---
title: "The Factory Method: The Artificer's Forge"
description: "Define an interface for creating an object, but let subclasses decide which class to instantiate."
type: vala
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Shaping"
formula: |2
  public abstract class GNOMEArtifice.Spellcaster : Object {
      public abstract Spell forge_spell();
      
      public void cast() {
          var spell = forge_spell();
          spell.invoke();
      }
  }
  
  public class GNOMEArtifice.Pyromancer : Spellcaster {
      public override Spell forge_spell() {
          return new Fireball();
      }
  }
  
  public class GNOMEArtifice.Cryomancer : Spellcaster {
      public override Spell forge_spell() {
          return new FrostNova();
      }
  }
  
  public interface GNOMEArtifice.Spell : Object {
      public abstract void invoke();
  }
  
  public class GNOMEArtifice.Fireball : Object, Spell {
      public void invoke() {
          print("A blazing fireball scorches the mainframe.\n");
      }
  }
  
  public class GNOMEArtifice.FrostNova : Object, Spell {
      public void invoke() {
          print("A wave of frost shatters the intrusion ice.\n");
      }
  }
tags: [Vala, GObject, Creational, Factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the chaotic depths of the Grid, a single spellcaster cannot master every discipline. The Factory Method pattern defers the exact nature of the incantation to specialized adepts. A Pyromancer shapes a Fireball; a Cryomancer weaves a Frost Nova. The base `Spellcaster` merely dictates the ritual flow, leaving the precise manifestation of the GNOME Artifice to the specialized subclasses, granting immense flexibility to your code's grimoire.
