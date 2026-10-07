---
title: The Chain of Responsibility
description: Passing a spell request along a chain of warding nodes.
type: cpp
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
formula: |2
  #include <memory>
  class Ward {
  protected: std::shared_ptr<Ward> next;
  public:
      virtual ~Ward() = default;
      void SetNext(std::shared_ptr<Ward> n) { next = n; }
      virtual void Handle(int power) {
          if(next) next->Handle(power);
      }
  };
  class FireWard : public Ward {
  public:
      void Handle(int power) override {
          if(power < 10) {} // Handled
          else if(next) next->Handle(power);
      }
  };
tags: [behavioral, chain-of-responsibility, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
