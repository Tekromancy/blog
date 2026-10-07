---
title: "The Abstract Factory: Forging the Gnome Artifice"
description: "Conjure families of related or dependent GObjects without specifying their concrete classes."
type: vala
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  public interface GNOMEArtifice.WidgetFactory : Object {
      public abstract Button create_button();
      public abstract Window create_window();
  }
  
  public class GNOMEArtifice.CyberpunkFactory : Object, WidgetFactory {
      public Button create_button() {
          return new NeonButton();
      }
      public Window create_window() {
          return new HolographicWindow();
      }
  }
  
  public class GNOMEArtifice.SteampunkFactory : Object, WidgetFactory {
      public Button create_button() {
          return new BrassButton();
      }
      public Window create_window() {
          return new CogWindow();
      }
  }
  
  public interface GNOMEArtifice.Button : Object {
      public abstract void click();
  }
  
  public interface GNOMEArtifice.Window : Object {
      public abstract void open();
  }
  
  public class GNOMEArtifice.NeonButton : Object, Button {
      public void click() {
          print("Neon button crackles with energy!\n");
      }
  }
  
  public class GNOMEArtifice.HolographicWindow : Object, Window {
      public void open() {
          print("Hologram projected.\n");
      }
  }
  
  public class GNOMEArtifice.BrassButton : Object, Button {
      public void click() {
          print("Brass button clicks with a mechanical clunk.\n");
      }
  }
  
  public class GNOMEArtifice.CogWindow : Object, Window {
      public void open() {
          print("Cogs grind as the window opens.\n");
      }
  }
tags: [Vala, GObject, Creational, Factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the sprawling undercity of GNOME Artifice, standard creation mechanisms fall short. The Abstract Factory pattern allows a technomancer to forge entire suites of related widgets—be they neon-drenched cyberpunk interfaces or brass-fitted steampunk mechanisms—without binding the spell to their concrete manifestations. By invoking an interface, you conjure the artifacts in harmonious sets, maintaining the aesthetic and structural integrity of your runic applications.
