---
title: The Visitor
description: Perform arcane operations on a complex taxonomy of serpent drones without altering them.
type: vyper
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // External Auditing"
formula: |2
  # pragma version ^0.3.7
  
  # The Elements that accept the visitor
  interface ISerpentDrone:
      def accept(visitor: address): nonpayable
      def get_stats() -> uint256: view
  
  # The Visitor that performs operations on the Elements
  interface IVisitor:
      def visit_viper(drone: address): nonpayable
      def visit_cobra(drone: address): nonpayable
  
  # Example Viper Contract:
  # @external
  # def accept(visitor: address):
  #     IVisitor(visitor).visit_viper(self)
  
  # The Concrete Visitor (e.g., a Tax Collector or Buffer)
  total_power: public(uint256)
  
  @external
  def visit_viper(drone: address):
      # Vipers contribute 1x their stats
      stats: uint256 = ISerpentDrone(drone).get_stats()
      self.total_power += stats
      
  @external
  def visit_cobra(drone: address):
      # Cobras contribute 2x their stats due to hood mechanics
      stats: uint256 = ISerpentDrone(drone).get_stats()
      self.total_power += stats * 2
tags: [behavioral, visitor, vyper, external-logic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The **Visitor** is a wandering auditor. When a Cyber-Mage needs to calculate the total war-power of a highly diverse serpent taxonomy, modifying every single drone contract to support this new calculation is impossible. Instead, the drones are built to `accept` a Visitor. The Visitor walks through the array, applying specialized logic (`visit_viper`, `visit_cobra`) extracting the necessary data without ever altering the drones' pristine source code.
