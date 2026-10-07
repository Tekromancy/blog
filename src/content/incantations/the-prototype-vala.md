---
title: "The Prototype: Duplicating the Artifact"
description: "Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype."
type: vala
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  public abstract class GNOMEArtifice.Construct : Object {
      public string id { get; set; }
      
      public abstract Construct clone_construct();
  }
  
  public class GNOMEArtifice.Drone : Construct {
      public string payload { get; set; }
      
      public override Construct clone_construct() {
          var clone = new Drone();
          clone.id = this.id;
          clone.payload = this.payload;
          return clone;
      }
  }
  
  public class GNOMEArtifice.Turret : Construct {
      public int ammo_capacity { get; set; }
      
      public override Construct clone_construct() {
          var clone = new Turret();
          clone.id = this.id;
          clone.ammo_capacity = this.ammo_capacity;
          return clone;
      }
  }
tags: [Vala, GObject, Creational, Prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the cost of invoking a new construct from the aether is too high, the technomancer turns to the Prototype. By treating an existing GNOME Artifact as a master template, you can rapidly clone an army of Drones or Turrets. This illusionary magic bypasses the arduous initialization rites, copying the state directly into a fresh vessel ready for immediate deployment in the cybernetic battlefield.
