---
title: The Proxy
description: A spectral guardian that stands in for a powerful, resource-intensive grimoire, only manifesting the real tome when truly needed.
type: inform7
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Prose-Based Spellcasting"
formula: |2
  The heavy grimoire is a thing. The heavy grimoire has a text called the forbidden lore. The forbidden lore of the heavy grimoire is "The secrets of the void."
  
  The spectral proxy is a thing. The spectral proxy has a truth state called the manifested. The manifested of the spectral proxy is false.
  
  To read the proxy:
      if the manifested of the spectral proxy is false:
          say "The spectral form solidifies, drawing immense mana to summon the heavy grimoire...";
          now the manifested of the spectral proxy is true;
      say "You read the tome: [forbidden lore of the heavy grimoire]."
tags: [structural, abjuration, proxy, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
