---
title: The Mediator of the Hypertext Labyrinth
description: Centralize the chaotic communication between clashing cyber-factions.
type: twine
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  :: StoryInit
  <<set setup.NetworkHub = {
    nodes: [],
    register: function(node) {
      this.nodes.push(node);
      node.hub = this;
    },
    broadcast: function(message, sender) {
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i] !== sender) {
          this.nodes[i].receive(message);
        }
      }
    }
  }>>
  
  <<set setup.createNode = function(name) {
    return {
      name: name,
      hub: null,
      send: function(msg) { this.hub.broadcast(msg, this); },
      receive: function(msg) { /* Custom logic */ }
    }
  }>>
  
  :: Passage
  /* Nodes communicate only through the Hub */
  <<set $hub to setup.NetworkHub>>
  <<set $alpha to setup.createNode("Alpha")>>
  <<set $beta to setup.createNode("Beta")>>
  <<run $hub.register($alpha)>>
  <<run $hub.register($beta)>>
  
  <<run $alpha.send("System breach imminent.")>>
tags: [behavioral, mediator, communication]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

If every node in the Labyrinth talked directly to every other node, the tangled web of dependencies would collapse into a digital singularity. The **Mediator** pattern enforces order.

The `NetworkHub` sits at the center of the web. Nodes (`Alpha`, `Beta`) know only of the Hub. When a node screams into the void, it screams to the Mediator, which then carefully orchestrates the broadcasting of that message to the rest of the Labyrinth, preventing a catastrophic cascade of tightly coupled code.
