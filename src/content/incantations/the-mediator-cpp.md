---
title: The Mediator
description: Centralizing complex communications between covens.
type: cpp
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Illusion // Telepathy
formula: |
  #include <string>
  class Coven;
  class Mediator {
  public: virtual void Notify(Coven* sender, std::string event) = 0;
  };
  class Coven {
  protected: Mediator* mediator;
  public: Coven(Mediator* m) : mediator(m) {}
  };
  class FireCoven : public Coven {
  public: FireCoven(Mediator* m) : Coven(m) {} void Act() { mediator->Notify(this, "Fire"); }
  };
tags: [behavioral, mediator, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
