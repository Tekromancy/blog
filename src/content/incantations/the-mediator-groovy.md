---
title: The Mediator Hex
description: Centralizing complex communications and control logic between cyber-nodes.
type: groovy
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Networkmancy"
formula: |2
  class ChatHub {
      List<Node> nodes = []

      void register(Node n) { nodes << n }

      void broadcast(Node sender, String msg) {
          nodes.findAll { it != sender }.each { it.receive(msg) }
      }
  }

  class Node {
      String id
      ChatHub hub

      void send(String msg) { hub.broadcast(this, msg) }
      void receive(String msg) { println "$id received: $msg" }
  }

  def hub = new ChatHub()
  def n1 = new Node(id: "Alpha", hub: hub)
  def n2 = new Node(id: "Beta", hub: hub)
  def n3 = new Node(id: "Gamma", hub: hub)

  hub.register(n1); hub.register(n2); hub.register(n3)

  n1.send("System initialized.")
tags: [groovy, behavioral, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator Hex

When cyber-nodes cross-communicate, chaos ensues. The Mediator hex establishes a central routing hub that encapsulates how these objects interact. Instead of nodes maintaining webs of references to each other, they speak only to the Mediator, which dictates the flow of arcane traffic across the network grid.
