---
title: The Iterator
description: Traverse a grimoire's cryptic dimensions sequentially.
type: python
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Necromancy // Crypt-Crawling
formula: |
  class GrimoireIterator:
      def __init__(self, pages: list):
          self._pages = pages
          self._index = 0
          
      def __iter__(self):
          return self
          
      def __next__(self):
          if self._index < len(self._pages):
              result = self._pages[self._index]
              self._index += 1
              return result
          raise StopIteration

  class CursedGrimoire:
      def __init__(self):
          self.pages = ["Blood Ritual", "Soul Tear", "Bone Splinter"]
          
      def __iter__(self):
          return GrimoireIterator(self.pages)

  # grimoire = CursedGrimoire()
  # for spell in grimoire:
  #     print(f"Reading: {spell}")
tags: [behavioral, python, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Iterator abstracts the dangerous traversal logic required to sift through a cursed Grimoire. Rather than exposing the underlying list structures to potential magical contamination, the iterator provides a standardized mechanism to safely extract knowledge, page by cursed page.
