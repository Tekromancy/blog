---
title: The Template Method of Standard Rituals
description: Define the skeleton of an algorithm in an operation, deferring steps to sub-rituals.
type: matlab
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Divination // Rituals"
formula: |2
  classdef (Abstract) RitualTemplate < handle
      methods
          function executeRitual(obj)
              obj.drawCircle();
              obj.channelEnergy();
              obj.sealCircle();
          end
          function drawCircle(obj)
              disp('Drawing default magic circle...');
          end
      end
      methods (Abstract)
          channelEnergy(obj)
          sealCircle(obj)
      end
  end
tags: [template, rituals, structure]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Template Method

Every ritual has a beginning and an end. Let the master class define the flow, while subclasses weave the specifics.
