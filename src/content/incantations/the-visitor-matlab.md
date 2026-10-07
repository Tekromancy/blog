---
title: The Visitor of External Manipulations
description: Represent an operation to be performed on the elements of a heterogenous arcane structure.
type: matlab
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // External"
formula: |2
  classdef (Abstract) ArcaneVisitor < handle
      methods (Abstract)
          visitRune(obj, rune)
          visitSigil(obj, sigil)
      end
  end

  classdef PowerAmplifierVisitor < ArcaneVisitor
      methods
          function visitRune(obj, rune)
              rune.Power = rune.Power * 1.5;
          end
          function visitSigil(obj, sigil)
              sigil.Resonance = sigil.Resonance * 2;
          end
      end
  end
tags: [visitor, manipulation, structures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# Visitor

Inject new behavior into the rigid structures of ancient sigils without disturbing their delicate internal code.
