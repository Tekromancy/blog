---
title: Decorator for Sprite Enchantment
description: Dynamically layer ethereal effects upon a base sprite.
type: gml
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Illusion // Sprite Enchantment"
formula: |2
  function BaseSpriteRenderer(_sprite) constructor {
      sprite = _sprite;
      static draw = function(_x, _y) {
          draw_sprite(sprite, 0, _x, _y);
      };
  }
  
  function SpriteDecorator(_renderer) constructor {
      base_renderer = _renderer;
      static draw = function(_x, _y) {
          base_renderer.draw(_x, _y);
      };
  }
  
  function GlowDecorator(_renderer) : SpriteDecorator(_renderer) constructor {
      static draw = function(_x, _y) {
          gpu_set_blendmode(bm_add);
          base_renderer.draw(_x, _y);
          gpu_set_blendmode(bm_normal);
      };
  }
tags: [gml, structural, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator is the core of visual stacking. A base sprite rendering incantation is wrapped in layered sigils—each decorator modifying the blend mode, shaders, or opacity dynamically, weaving intricate aesthetics without altering the core entity.
