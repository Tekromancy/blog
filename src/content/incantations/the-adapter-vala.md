---
title: "The Adapter: Bridging the Analog Chasm"
description: "Convert the interface of a class into another interface clients expect."
type: vala
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Integration"
formula: |2
  public interface GNOMEArtifice.CyberInterface : Object {
      public abstract void jack_in(string terminal_id);
  }
  
  // The legacy class we want to adapt
  public class GNOMEArtifice.AnalogDialup : Object {
      public void connect_modem(int baud_rate, string number) {
          print(@"Dialing $(number) at $(baud_rate) baud... \n");
      }
  }
  
  // The Adapter
  public class GNOMEArtifice.DialupAdapter : Object, CyberInterface {
      private AnalogDialup legacy_system;
  
      public DialupAdapter(AnalogDialup legacy_system) {
          this.legacy_system = legacy_system;
      }
  
      public void jack_in(string terminal_id) {
          print(@"Adapting cyber-jack request to analog lines for $(terminal_id).\n");
          this.legacy_system.connect_modem(9600, terminal_id);
      }
  }
tags: [Vala, GObject, Structural, Adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Not all artifacts in the GNOME architecture are built with cutting-edge cybernetics. Often, a technomancer must interface sleek, modern runic structures with crumbling analog dial-ups from a bygone age. The Adapter pattern translates the incantations. It wraps the archaic object, translating the standard `jack_in` method into the specific pulse-and-tone dialing required by the ancient hardware, bridging the chasm without modifying the sacred old code.
