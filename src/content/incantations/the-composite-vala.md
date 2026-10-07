---
title: "The Composite: The Fractal Network"
description: "Compose objects into tree structures to represent part-whole hierarchies."
type: vala
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Fractal"
formula: |2
  public interface GNOMEArtifice.NetworkNode : Object {
      public abstract void ping();
  }
  
  public class GNOMEArtifice.Terminal : Object, NetworkNode {
      private string name;
  
      public Terminal(string name) {
          this.name = name;
      }
  
      public void ping() {
          print(@"Terminal $(this.name) active.\n");
      }
  }
  
  public class GNOMEArtifice.Subnet : Object, NetworkNode {
      private string name;
      private GenericArray<NetworkNode> nodes;
  
      public Subnet(string name) {
          this.name = name;
          this.nodes = new GenericArray<NetworkNode>();
      }
  
      public void add_node(NetworkNode node) {
          this.nodes.add(node);
      }
  
      public void ping() {
          print(@"Pinging subnet $(this.name):\n");
          for (int i = 0; i < this.nodes.length; i++) {
              this.nodes[i].ping();
          }
      }
  }
tags: [Vala, GObject, Structural, Composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When navigating the deep web topologies of GNOME, treating individual terminals and entire sprawling subnets differently creates unmanageable rituals. The Composite pattern unifies them. Both a single Terminal and a massive Subnet implement the `NetworkNode` interface. When you cast a `ping()` spell on a subnet, the magic cascades down the fractal branches, echoing through every connected node without the caster needing to differentiate between leaf and branch.
