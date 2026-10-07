---
title: The Singleton of Global Nexus
description: Ensure only one Global Nexus exists across the MATLAB workspace.
type: matlab
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Nexus"
formula: |2
  classdef GlobalNexus < handle
      properties (Access = private)
          NexusEnergy
      end

      methods (Access = private)
          function obj = GlobalNexus()
              obj.NexusEnergy = inf;
          end
      end

      methods (Static)
          function singleObj = getInstance()
              persistent localObj
              if isempty(localObj) || ~isvalid(localObj)
                  localObj = GlobalNexus();
              end
              singleObj = localObj;
          end
      end
  end
tags: [singleton, nexus, global]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Singleton

The Global Nexus is a singular construct; attempting to instantiate two will tear the fabric of the workspace...
