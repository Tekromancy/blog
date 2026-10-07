---
title: The Chain of Responsibility of Error Wards
description: Pass computational anomalies along a chain of magical handlers.
type: matlab
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  classdef (Abstract) AnomalyHandler < handle
      properties
          NextHandler
      end
      methods
          function setNext(obj, handler)
              obj.NextHandler = handler;
          end
          function handle(obj, anomaly)
              if ~obj.resolve(anomaly) && ~isempty(obj.NextHandler)
                  obj.NextHandler.handle(anomaly);
              end
          end
      end
      methods (Abstract)
          resolved = resolve(obj, anomaly)
      end
  end
tags: [chain, anomaly, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Chain of Responsibility

Let the singularity be passed down the chain until a handler can nullify its destructive potential.
