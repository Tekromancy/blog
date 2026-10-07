---
title: The Iterator
description: Traversing a mystical collection of artifacts sequentially.
type: cpp
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  #include <vector>
  #include <string>
  class VaultIterator {
      const std::vector<std::string>& items;
      size_t pos = 0;
  public:
      VaultIterator(const std::vector<std::string>& i) : items(i) {}
      bool HasNext() const { return pos < items.size(); }
      std::string Next() { return items[pos++]; }
  };
  class Vault {
      std::vector<std::string> artifacts{"Sword", "Shield"};
  public:
      VaultIterator CreateIterator() const { return VaultIterator(artifacts); }
  };
tags: [behavioral, iterator, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
