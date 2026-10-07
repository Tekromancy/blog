---
title: The Mediator of the Nexus Hub
description: Centralizing complex communications between decoupled nodes to prevent chaotic relational webs.
type: cypher
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus Orchestration"
formula: |2
  // A service requests to broadcast a message to connected peers
  MATCH (sender:Service {id: 'AuthService'})
  
  // Instead of P2P links, route through the central Mediator (MessageBroker)
  MATCH (sender)-[:PUBLISHES_TO]->(broker:MessageBroker {channel: 'SystemEvents'})
  
  // The Mediator distributes the signal to all subscribed endpoints
  MATCH (broker)-[:SUBSCRIBES_TO]-(receiver:Service)
  WHERE receiver.id <> sender.id
  
  // Dispatch the payload (represented by creating an ephemeral Event node)
  CREATE (e:Event {payload: $payload, timestamp: timestamp()})
  MERGE (broker)-[:DISPATCHED]->(e)
  MERGE (e)-[:DELIVERED_TO]->(receiver)
  
  RETURN receiver.id AS NotifiedServices, e.id AS EventID
tags: [cypher, mediator, behavioral, pub-sub, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator pattern reduces chaotic dependencies between objects by restricting direct communications and forcing them to collaborate only via a mediator object. In a naive graph schema, connecting every `Service` to every other `Service` results in an unmanageable, dense hairball of relationships.

We solve this by instantiating a `MessageBroker` node. This acts as the Nexus hub. Services only need to know about the broker; they publish and subscribe through it. When a signal is fired, the Cypher query traverses the broker to fan out the event, maintaining a clean, star-topology graph that is effortlessly scalable.
