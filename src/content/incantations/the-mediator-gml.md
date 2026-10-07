---
title: Mediator for Sprite Enchantment
description: Centralize complex communication between disparate enchanted sprites to prevent chaotic magical crossfire.
type: gml
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Illusion // Sprite Enchantment"
formula: |2
  function SpriteNexus() constructor {
      sprites = [];
      static register = function(_sprite) { array_push(sprites, _sprite); };
      
      static notify = function(_sender, _event) {
          if (_event == "explode") {
              for (var i = 0; i < array_length(sprites); i++) {
                  if (sprites[i] != _sender) {
                      sprites[i].apply_recoil();
                  }
              }
          }
      };
  }
  
  function BoundSprite(_nexus) constructor {
      nexus = _nexus;
      nexus.register(self);
      
      static explode = function() { nexus.notify(self, "explode"); };
      static apply_recoil = function() { /* get pushed back */ };
  }
tags: [gml, behavioral, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator avoids the tangled web of dependencies wherein every sprite monitors every other sprite. Instead, they all speak to the Nexus. When one erupts in fiery magic, the Nexus orchestrates the recoil of all surrounding entities seamlessly.
