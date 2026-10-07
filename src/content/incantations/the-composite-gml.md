---
title: Composite for Sprite Enchantment
description: Treat a solitary enchanted sprite and a swarm of them uniformly.
type: gml
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Sprite Enchantment"
formula: |2
  function EnchantmentNode() constructor {
      static render_magic = function() {};
  }
  
  function SingleSpriteNode(_sprite) : EnchantmentNode() constructor {
      sprite = _sprite;
      static render_magic = function() { draw_sprite(sprite, 0, x, y); };
  }
  
  function SpriteSwarm() : EnchantmentNode() constructor {
      children = [];
      static add = function(_node) { array_push(children, _node); };
      static render_magic = function() {
          for (var i = 0; i < array_length(children); i++) {
              children[i].render_magic();
          }
      };
  }
tags: [gml, structural, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern weaves individual sparks and roaring infernos into the same abstraction. The spellcaster evokes `render_magic()` upon a single ember or a swirling vortex of a thousand composite sprites without distinguishing between them.
