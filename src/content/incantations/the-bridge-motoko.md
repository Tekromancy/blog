---
title: The Bridge Hex
description: Decoupling a spell's elemental abstraction from its casting mechanism.
type: motoko
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Actor Model Hexes"
formula: |2
  module Bridge {
    public type Element = {
      ignite : () -> Text;
    };
  
    public class FireElement() {
      public func ignite() : Text { "Flames" };
    };
  
    public class VoidElement() {
      public func ignite() : Text { "Darkness" };
    };
  
    public type SpellAbstraction = {
      cast : () -> async Text;
    };
  
    public class Hex(element : Element) {
      public func cast() : async Text {
        "Casting Hex of " # element.ignite();
      };
    };
  
    public class Charm(element : Element) {
      public func cast() : async Text {
        "Casting Charm of " # element.ignite();
      };
    };
  
    public actor Spellbook {
      public func readVoidHex() : async Text {
        let voidElem = VoidElement();
        let myHex = Hex(voidElem);
        await myHex.cast();
      };
    };
  }
tags: [motoko, structural, bridge, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge Hex prevents the combinatorial explosion of spell variants. Instead of a `VoidHex` and a `FireHex`, we separate the nature of the magic (`Hex`, `Charm`) from the elements they channel (`Fire`, `Void`), allowing them to be mixed dynamically at runtime by actors.
