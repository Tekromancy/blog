---
title: The Adapter
description: Translate alien incantations to a modern standard interface.
type: python
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Linguistic Alchemy
formula: |
  class ModernSpell:
      def cast_spell(self) -> str:
          return "Casting a standard spell."

  class EldritchScroll:
      def utter_eldritch_words(self) -> str:
          return "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn."

  class EldritchAdapter(ModernSpell):
      def __init__(self, scroll: EldritchScroll):
          self.scroll = scroll

      def cast_spell(self) -> str:
          words = self.scroll.utter_eldritch_words()
          return f"Adapted and channeled: {words}"

  # scroll = EldritchScroll()
  # adapter = EldritchAdapter(scroll)
  # print(adapter.cast_spell())
tags: [structural, python, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter bridges the sanity-shattering gap between ancient eldritch lore and modern standardized spellcasting. By wrapping the chaotic artifact in a safe, predictable interface, a magus can safely tap into forbidden knowledge without re-architecting their entire magical framework.
