---
title: "The Factory Method"
description: "Delegating STARK parameter creation to specialized incantations."
type: cairo
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Spawning"
formula: |2
  trait IParameterFactory {
      fn create_parameter() -> felt252;
  }
  impl FriParameterFactory of IParameterFactory {
      fn create_parameter() -> felt252 {
          'fri_param'
      }
  }
  impl StarkParameterFactory of IParameterFactory {
      fn create_parameter() -> felt252 {
          'stark_param'
      }
  }
tags: [cairo, design-pattern, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Allows sub-schools of proving to define their own specific parameter instantiation, keeping the core ritual generic.
