---
title: Facade for Sprite Enchantment
description: Provide a unified, simple sigil to command complex underlying rendering subsystems.
type: gml
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Sprite Enchantment"
formula: |2
  function EnchantmentFacade() constructor {
      shader_sys = new ShaderSubsystem();
      particle_sys = new ParticleSubsystem();
      blend_sys = new BlendSubsystem();
      
      static ignite_sprite = function(_target) {
          shader_sys.apply_flame_distortion();
          blend_sys.set_additive();
          particle_sys.emit_sparks(_target.x, _target.y);
          _target.draw_self();
          blend_sys.reset();
          shader_sys.reset();
      };
  }
tags: [gml, structural, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Facade obscures the horrifying complexities of shaders, particle matrices, and GPU blend states behind a single, elegant incantation. Apprentices need only call `ignite_sprite` to summon the inferno.
