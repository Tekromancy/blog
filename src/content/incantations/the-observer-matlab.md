---
title: The Observer of Event Horizons
description: Define a one-to-many dependency so when a matrix shifts, all dependent glyphs update.
type: matlab
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Resonance"
formula: |2
  classdef (Abstract) Observer < handle
      methods (Abstract)
          update(obj, subject)
      end
  end

  classdef MatrixSubject < handle
      properties
          Observers = []
          Data
      end
      methods
          function attach(obj, obs)
              obj.Observers = [obj.Observers, obs];
          end
          function setData(obj, data)
              obj.Data = data;
              obj.notify();
          end
          function notify(obj)
              for i = 1:length(obj.Observers)
                  obj.Observers(i).update(obj);
              end
          end
      end
  end
tags: [observer, events, resonance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Observer

When the core matrix pulses with new energy, let all linked artifacts feel the resonance immediately.
