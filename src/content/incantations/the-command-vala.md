---
title: "The Command: Encapsulating the Will"
description: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests."
type: vala
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Domination"
formula: |2
  public interface GNOMEArtifice.CyberCommand : Object {
      public abstract void execute();
  }
  
  public class GNOMEArtifice.DroneControl : Object {
      public void launch() { print("Drone swarm launching.\n"); }
      public void self_destruct() { print("Drone swarm initiating self-destruct sequence.\n"); }
  }
  
  public class GNOMEArtifice.LaunchCommand : Object, CyberCommand {
      private DroneControl control;
      public LaunchCommand(DroneControl control) { this.control = control; }
      public void execute() { this.control.launch(); }
  }
  
  public class GNOMEArtifice.DestructCommand : Object, CyberCommand {
      private DroneControl control;
      public DestructCommand(DroneControl control) { this.control = control; }
      public void execute() { this.control.self_destruct(); }
  }
  
  public class GNOMEArtifice.NeuralLink : Object {
      private CyberCommand cmd;
      public void set_command(CyberCommand cmd) { this.cmd = cmd; }
      public void trigger() { this.cmd.execute(); }
  }
tags: [Vala, GObject, Behavioral, Command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A Neural Link must remain agnostic to the specific destruction it wreaks. By utilizing the Command pattern, the intent of the user—be it launching a drone swarm or initiating a scorched-earth self-destruct—is crystallized into an object. The invocation `trigger()` simply releases the contained spell, allowing the GNOME Artifice to queue, delay, or log the deadly commands without entangling the triggering apparatus in the morbid details of the execution.
