---
title: The Visitor
description: Representing an operation to be performed on the elements of an arcane object structure.
type: cpp
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  class Rune;
  class Sigil;
  class SpellVisitor {
  public:
      virtual void VisitRune(Rune* r) = 0;
      virtual void VisitSigil(Sigil* s) = 0;
  };
  class MagicalElement {
  public: virtual void Accept(SpellVisitor* v) = 0;
  };
  class Rune : public MagicalElement {
  public: void Accept(SpellVisitor* v) override { v->VisitRune(this); }
  };
tags: [behavioral, visitor, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
