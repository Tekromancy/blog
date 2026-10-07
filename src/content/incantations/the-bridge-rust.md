---
title: Bridge of the Astral Tethers
description: Decouple an abstraction from its implementation so that the two can vary independently.
type: rust
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Planar-binding"
formula: |2
  pub trait RenderingEngine {
      fn render_hologram(&self, shape: &str);
  }

  pub struct OpenGLRender;
  impl RenderingEngine for OpenGLRender {
      fn render_hologram(&self, shape: &str) { println!("OpenGL rendering {}", shape); }
  }

  pub struct VulkanRender;
  impl RenderingEngine for VulkanRender {
      fn render_hologram(&self, shape: &str) { println!("Vulkan rendering {}", shape); }
  }

  pub trait Construct {
      fn manifest(&self);
  }

  pub struct ElementalConstruct<'a> {
      engine: &'a dyn RenderingEngine,
  }

  impl<'a> ElementalConstruct<'a> {
      pub fn new(engine: &'a dyn RenderingEngine) -> Self { Self { engine } }
  }

  impl<'a> Construct for ElementalConstruct<'a> {
      fn manifest(&self) {
          self.engine.render_hologram("Elemental Form");
      }
  }
tags: [structural, bridge, planar-binding, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern weaves the Astral Tethers, separating the platonic ideal of an entity from the physical medium of its manifestation. In the cyber-realm, your entities should not be tightly bound to the specifics of the rendering hardware or physical layer.

By isolating the abstraction (the Construct) from the implementation (the Rendering Engine), the cyber-mage allows both realms to evolve independently. A new elemental can be devised without altering the rendering API, and a new Vulkan renderer can be swapped in without corrupting the elemental's true form.
