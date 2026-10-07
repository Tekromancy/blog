---
title: The Interpreter
description: Parse and execute primitive bytecode instructions on-chain.
type: vyper
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Parsing"
formula: |2
  # pragma version ^0.3.7
  
  # A very simple virtual machine to parse serpent-runes
  # 0x01: SLITHER (move forward)
  # 0x02: COIL (defend)
  # 0x03: STRIKE (attack)
  
  state_position: public(uint256)
  state_defense: public(uint256)
  
  @external
  def execute_runes(runes: Bytes[64]):
      for i in range(64):
          if i >= len(runes):
              break
              
          instruction: bytes1 = slice(runes, i, 1)
          
          if instruction == b'\x01':
              self.state_position += 1
          elif instruction == b'\x02':
              self.state_defense += 10
          elif instruction == b'\x03':
              # trigger attack
              pass
          else:
              # unknown rune, fizzle
              continue
tags: [behavioral, interpreter, vyper, vm, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The **Interpreter** is a dark and costly magic, building a VM inside a VM. When complex decision trees cannot be hardcoded into the contract, the adept provides a stream of raw bytes (serpent-runes). The contract parses these runes sequentially, mutating its state according to its own internal dialect. It is a powerful tool for on-chain AI and generative behaviors, though it hungers greatly for gas.
