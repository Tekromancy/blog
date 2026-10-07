---
title: The Memento of the Progenitor
description: Capture and restore the state of the Weave securely through opaque types.
type: sml
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  signature SPELL_WEAVER = sig
    type memento
    val setPower : int -> unit
    val getPower : unit -> int
    val saveState : unit -> memento
    val restoreState : memento -> unit
  end
  
  structure SpellWeaver :> SPELL_WEAVER = struct
    val power = ref 10
    
    (* Opaque outside the signature due to ':>' *)
    type memento = int
    
    fun setPower p = power := p
    fun getPower () = !power
    
    fun saveState () = !power
    fun restoreState m = power := m
  end
  
  val _ = SpellWeaver.setPower 50
  val safePoint = SpellWeaver.saveState ()
  val _ = SpellWeaver.setPower 100
  val _ = SpellWeaver.restoreState safePoint
  val currentPower = SpellWeaver.getPower () (* Returns 50 *)
tags: [opaque types, references, state restoration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

True mastery of the Memento pattern requires the use of SML's opaque signature matching (`:>`). By hiding the actual implementation of the `memento` type, the client can store the state, but cannot inspect or maliciously alter it. The encapsulated state of the `SpellWeaver` is preserved flawlessly, bending the very flow of time to the mage's will.
