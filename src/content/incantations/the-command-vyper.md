---
title: The Command
description: Encapsulate a strike order as an object for delayed execution.
type: vyper
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Delayed Sigils"
formula: |2
  # pragma version ^0.3.7
  
  struct StrikeOrder:
      target: address
      venom_dose: uint256
      executed: bool
  
  orders: public(HashMap[uint256, StrikeOrder])
  order_count: public(uint256)
  
  @external
  def issue_command(_target: address, _dose: uint256):
      self.orders[self.order_count] = StrikeOrder({
          target: _target,
          venom_dose: _dose,
          executed: False
      })
      self.order_count += 1
  
  @external
  def execute_command(id: uint256):
      assert not self.orders[id].executed, "Command already expended"
      self.orders[id].executed = True
      
      # Execute the stored parameters
      # ISerpentTarget(self.orders[id].target).inject(self.orders[id].venom_dose)
      pass
tags: [behavioral, command, vyper, delayed-execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Command** pattern is a form of delayed evocation. Instead of striking immediately, the Over-mind encapsulates all parameters of a lethal request (target, venom dosage, timing) into a discrete `StrikeOrder` struct stored on-chain. This allows the Swarm to queue, log, or even revoke commands before a cron-bot triggers the `execute_command` ritual at the prophesied hour.
