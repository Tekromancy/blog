---
title: The Adapter
description: Bridging arcane legacy ActionScript 2.0 blood magic with modern AS3 interfaces.
type: actionscript
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Legacy Binding"
formula: |2
  package arcana.adapter {
      // The modern interface required by the AS3 cult
      public interface IModernSpellcaster {
          function castDestruction():void;
      }

      // The ancient AS2 legacy class we refuse to rewrite
      public class LegacyBloodMage {
          public function onEnterFrameBloodSacrifice():void {
              trace("Legacy AS2: _root.blood = _root.blood - 1;");
          }
      }

      // The Adapter
      public class BloodMageAdapter implements IModernSpellcaster {
          private var _ancientMage:LegacyBloodMage;

          public function BloodMageAdapter(mage:LegacyBloodMage) {
              this._ancientMage = mage;
          }

          public function castDestruction():void {
              trace("Adapting modern spellcast to ancient blood sacrifice...");
              _ancientMage.onEnterFrameBloodSacrifice();
          }
      }
  }
tags: [adapter, actionscript, flash, as2-to-as3]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
