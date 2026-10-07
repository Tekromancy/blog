---
title: The Proxy
description: Control access to an ancient, sleeping serpent with a vigilant gateway.
type: vyper
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding Gateways"
formula: |2
  # pragma version ^0.3.7
  
  interface IAncientSerpent:
      def consume_sacrifice(amount: uint256): nonpayable
  
  ancient_serpent: public(address)
  high_priest: public(address)
  is_awake: public(bool)
  
  @external
  def __init__(_serpent: address, _priest: address):
      self.ancient_serpent = _serpent
      self.high_priest = _priest
      self.is_awake = False
  
  @external
  def awaken():
      assert msg.sender == self.high_priest, "Only the High Priest may wake it"
      self.is_awake = True
  
  @external
  def offer_tribute(amount: uint256):
      assert self.is_awake, "The Serpent slumbers still"
      
      # The proxy forwards the validated request
      IAncientSerpent(self.ancient_serpent).consume_sacrifice(amount)
tags: [structural, proxy, vyper, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Proxy** serves as a guardian interface. Directly interacting with the unbridled logic of the Ancient Serpent is forbidden and dangerous. The Proxy acts as a protective sigil, verifying the caller's rank (High Priest), ensuring the astral conditions are correct (the Serpent is awake), and only then passing the tribute down to the hidden contract.
