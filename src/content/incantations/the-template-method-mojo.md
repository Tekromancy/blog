---
title: The Template Method of Forging
description: Defining the skeleton of an algorithm while deferring some steps.
type: mojo
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  struct BaseSerpentForge:
      fn prepare_metals(self) -> String:
          return "Silicon heated to melting point."
          
      # In a true template method, this would be abstract/overridden.
      # Mojo simulates this via composition or passing function pointers.
      fn infuse_magic(self, magic_type: String) -> String:
          if magic_type == "speed":
              return "Infused with quantum tachyon particles."
          return "Infused with base logic."
          
      fn forge_serpent(self, m_type: String):
          print(self.prepare_metals())
          print(self.infuse_magic(m_type))
          print("Serpent compilation complete.")

  fn main():
      let forge = BaseSerpentForge()
      forge.forge_serpent("speed")
tags: [behavioral, template-method, mojo, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method of Forging

Certain cyber-magical rituals follow a strict, unvarying sequence: prepare the silicon, infuse the magic, compile the serpent. The **Template Method** defines this overarching skeleton in a base operation, allowing specific steps (like the type of magic infused) to vary.

While Mojo does not rely on deep class hierarchies, we apply this pattern by creating a fixed algorithmic structure that conditionally dispatches or utilizes injected behavior. The template guarantees that the essential ritual steps are never skipped.
