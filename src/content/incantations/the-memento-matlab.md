---
title: The Memento of Temporal Snapshots
description: Capture and restore the internal state of a volatile matrix.
type: matlab
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  classdef MatrixMemento
      properties (SetAccess = private)
          State
      end
      methods
          function obj = MatrixMemento(state)
              obj.State = state;
          end
      end
  end

  classdef VolatileMatrix < handle
      properties
          Data
      end
      methods
          function memento = save(obj)
              memento = MatrixMemento(obj.Data);
          end
          function restore(obj, memento)
              obj.Data = memento.State;
          end
      end
  end
tags: [memento, chronomancy, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Memento

Preserve the ethereal configuration of your spell so that if it unravels, time may be reversed.
