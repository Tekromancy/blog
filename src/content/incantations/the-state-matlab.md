---
title: The State of Phase Transitions
description: Allow an algorithm to alter its behavior when its internal phase shifts.
type: matlab
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Divination // Phases"
formula: |2
  classdef (Abstract) ComputationState
      methods (Abstract)
          process(obj, context, data)
      end
  end

  classdef SolidState < ComputationState
      methods
          function process(obj, context, data)
              disp('Processing in Solid State: Deterministic logic.');
              if norm(data) > 100
                  context.setState(LiquidState());
              end
          end
      end
  end
tags: [state, phases, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# State

The algorithm melts from solid deterministic logic into a fluid stochastic approach as its mana threshold is crossed.
