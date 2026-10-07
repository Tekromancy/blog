---
title: "The Abstract Factory of Temporal Planes"
description: "Specify state-space generators that yield congruent chronomantic entities across multiple interwoven timelines."
type: tlaplus
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE AbstractFactory ----
  EXTENDS Naturals, FiniteSets
  
  CONSTANTS Planes, Entities, EntityFactory(_)
  
  ASSUME \A p \in Planes : EntityFactory(p) \subseteq Entities
  
  VARIABLES currentPlane, generatedEntities
  
  Init == 
      /\ currentPlane \in Planes
      /\ generatedEntities = {}
      
  GenerateEntity(e) ==
      /\ e \in EntityFactory(currentPlane)
      /\ generatedEntities' = generatedEntities \union {e}
      /\ UNCHANGED currentPlane
      
  SwitchPlane(p) ==
      /\ p \in Planes
      /\ currentPlane' = p
      /\ UNCHANGED generatedEntities
      
  Next == 
      \/ \E e \in Entities : GenerateEntity(e)
      \/ \E p \in Planes : SwitchPlane(p)
      
  Spec == Init /\ [][Next]_<<currentPlane, generatedEntities>>
  
  TypeOK == currentPlane \in Planes /\ generatedEntities \subseteq Entities
  ====
tags: [tla, state-space, temporal-divination, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory is not merely an object creator; it is a dimensional loom. In our temporal divination, it ensures that all generated entities are native to the `currentPlane`. The model checker explores the state space, ensuring that no cross-planar contamination occurs unless explicitly woven by the seer.
