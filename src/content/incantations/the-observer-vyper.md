---
title: The Observer
description: Broadcast events to awaken dormant contracts when the serpent strikes.
type: vyper
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Event Whispers"
formula: |2
  # pragma version ^0.3.7
  
  interface IWatcher:
      def on_strike(target: address, damage: uint256): nonpayable
  
  watchers: public(DynArray[address, 10])
  
  # Standard EVM events are the ultimate Observer pattern, but on-chain
  # callbacks can also be used to trigger immediate reactions.
  event SerpentStruck:
      target: indexed(address)
      damage: uint256
  
  @external
  def add_watcher(watcher: address):
      self.watchers.append(watcher)
  
  @external
  def strike(target: address):
      damage: uint256 = 50
      
      # 1. EVM Event for off-chain observers (DApps, Indexers)
      log SerpentStruck(target, damage)
      
      # 2. On-chain callback for subscribed watcher contracts
      for w in self.watchers:
          IWatcher(w).on_strike(target, damage)
tags: [behavioral, observer, vyper, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Observer** pattern is the lifeblood of reactive blockchain networks. The Serpent does not need to know the identities of its worshipers. When it strikes, it emits an arcane shockwave (an Event Log) for off-chain daemons to catch, while simultaneously pushing callbacks to any on-chain watcher contracts registered in its arrays. The hive reacts instantly to the trigger.
