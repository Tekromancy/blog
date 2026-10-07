---
title: The Mediator of Subsystem Resonance
description: Centralize complex communications between different plotting and calculation artifacts.
type: matlab
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Harmony"
formula: |2
  classdef ArcaneMediator < handle
      properties
          Plotter
          Calculator
      end
      methods
          function notify(obj, sender, event)
              if eq(sender, obj.Calculator) && strcmp(event, 'Calculated')
                  disp('Mediator routing data to Plotter...');
                  obj.Plotter.plot(obj.Calculator.Data);
              end
          end
      end
  end
tags: [mediator, harmony, UI]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Mediator

Keep your enchanted artifacts from tangling their own threads of communication.
