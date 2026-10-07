---
title: The Factory Method
description: A polymorphic glyph that delegates the manifestation of specific entities to specialized sub-wards.
type: coq
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Invocation"
formula: |2
  (* Gallina Ward: Factory Method *)
  Require Import String.
  
  Inductive EntityType :=
    | Daemon
    | Sprite.
  
  Record Entity := mkEntity {
    name : string;
    power : nat
  }.
  
  Definition summonDaemon : Entity := mkEntity "NullDaemon" 100.
  Definition summonSprite : Entity := mkEntity "ByteSprite" 10.
  
  Definition summon (t : EntityType) : Entity :=
    match t with
    | Daemon => summonDaemon
    | Sprite => summonSprite
    end.
tags: [factory-method, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
