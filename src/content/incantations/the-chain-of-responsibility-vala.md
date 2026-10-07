---
title: "The Chain of Responsibility: Cascading Defenses"
description: "Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request."
type: vala
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Contingency"
formula: |2
  public abstract class GNOMEArtifice.SecurityNode : Object {
      protected SecurityNode next_node;
  
      public void set_next(SecurityNode node) {
          this.next_node = node;
      }
  
      public abstract void handle_intrusion(int threat_level);
  }
  
  public class GNOMEArtifice.FirewallNode : SecurityNode {
      public override void handle_intrusion(int threat_level) {
          if (threat_level <= 2) {
              print("Firewall deflected minor probe.\n");
          } else if (this.next_node != null) {
              print("Firewall breached! Escalating...\n");
              this.next_node.handle_intrusion(threat_level);
          }
      }
  }
  
  public class GNOMEArtifice.BlackICENode : SecurityNode {
      public override void handle_intrusion(int threat_level) {
          if (threat_level <= 5) {
              print("Black ICE neutralizing threat. Target neural-stunned.\n");
          } else if (this.next_node != null) {
              print("Black ICE bypassed! Escalating...\n");
              this.next_node.handle_intrusion(threat_level);
          }
      }
  }
tags: [Vala, GObject, Behavioral, Chain]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When defending a cybernetic citadel, threats arrive in unpredictable magnitudes. A static defensive function either overreacts to a script-kiddie or crumbles before a corporate strike team. The Chain of Responsibility pattern lines your wards sequentially. A minor probe bounces off the Firewall; a serious incursion bypasses it, automatically escalating to the lethal Black ICE. The GNOME Artifice scales its wrath dynamically without hardcoding responses.
