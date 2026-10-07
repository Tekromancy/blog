---
title: The Proxy of Delayed Evaluation
description: Provide a surrogate for a massive dataset until its magic is truly needed.
type: matlab
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Illusion"
formula: |2
  classdef MassiveMatrixProxy < handle
      properties
          FilePath
          RealMatrix
      end

      methods
          function obj = MassiveMatrixProxy(path)
              obj.FilePath = path;
          end

          function data = getData(obj)
              if isempty(obj.RealMatrix)
                  disp('Awakening the massive matrix from disk...');
                  obj.RealMatrix = load(obj.FilePath);
              end
              data = obj.RealMatrix;
          end
      end
  end
tags: [proxy, illusion, lazy-load]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Proxy

An illusion of infinite data, loading into reality only when the veil is pierced.
