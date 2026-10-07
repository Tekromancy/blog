---
title: "The Visitor: The Diagnostic Probe"
description: "Represent an operation to be performed on the elements of an object structure."
type: vala
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  public interface GNOMEArtifice.ConstructVisitor : Object {
      public abstract void visit_turret(TurretNode turret);
      public abstract void visit_drone(DroneNode drone);
  }
  
  public interface GNOMEArtifice.ConstructElement : Object {
      public abstract void accept(ConstructVisitor visitor);
  }
  
  public class GNOMEArtifice.TurretNode : Object, ConstructElement {
      public int ammo = 100;
      public void accept(ConstructVisitor visitor) {
          visitor.visit_turret(this);
      }
  }
  
  public class GNOMEArtifice.DroneNode : Object, ConstructElement {
      public int battery = 50;
      public void accept(ConstructVisitor visitor) {
          visitor.visit_drone(this);
      }
  }
  
  public class GNOMEArtifice.DiagnosticScanner : Object, ConstructVisitor {
      public void visit_turret(TurretNode turret) {
          print(@"Turret diagnostics: $(turret.ammo) rounds remaining.\n");
      }
  
      public void visit_drone(DroneNode drone) {
          print(@"Drone diagnostics: $(drone.battery)% battery charge.\n");
      }
  }
tags: [Vala, GObject, Behavioral, Visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When managing a sprawling defensive line of Constructs, adding new operational logic—like a diagnostic scan—directly into the classes bloats them and risks destabilizing the weapon systems. The Visitor pattern acts as a ghost in the machine. You unleash a `DiagnosticScanner` probe. Each Construct merely `accept()`s the probe, granting it access. The probe performs its arcane calculations externally, allowing the GNOME Artifice to append endless new operations without ever rewriting the core hardware definitions.
