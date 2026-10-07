---
title: The Observer
description: Allowing familiars to react to shifts in magical leylines.
type: cpp
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Foresight
formula: |
  #include <vector>
  class Observer { public: virtual void Update() = 0; };
  class Leyline {
      std::vector<Observer*> watchers;
  public:
      void Attach(Observer* o) { watchers.push_back(o); }
      void Surge() { for(auto w : watchers) w->Update(); }
  };
  class Familiar : public Observer {
  public: void Update() override {}
  };
tags: [behavioral, observer, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
