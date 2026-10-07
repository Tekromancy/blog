---
title: The Proxy
description: Control access to a dangerous demonic entity.
type: python
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Binding
formula: |
  from abc import ABC, abstractmethod

  class DemonContract(ABC):
      @abstractmethod
      def grant_wish(self, wish: str) -> str: pass

  class Archdemon(DemonContract):
      def grant_wish(self, wish: str) -> str:
          return f"Wish '{wish}' granted, but your soul is forfeit."

  class ProxyDemon(DemonContract):
      def __init__(self, soul_purity: int):
          self.archdemon = None
          self.soul_purity = soul_purity

      def grant_wish(self, wish: str) -> str:
          if self.soul_purity < 50:
              return "Access Denied: Soul too tainted to survive contact."
          if not self.archdemon:
              self.archdemon = Archdemon() # Lazy initialization
          return self.archdemon.grant_wish(wish)

  # proxy = ProxyDemon(soul_purity=80)
  # print(proxy.grant_wish("Infinite Power"))
tags: [structural, python, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy stands between the reckless user and an immensely costly operation—such as summoning an Archdemon. It defers the heavy metaphysical cost (lazy initialization) and enforces strict access control rules (soul purity checks) before passing the invocation to the true subject.
