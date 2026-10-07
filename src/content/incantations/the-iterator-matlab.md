---
title: The Iterator of Dimensional Traversal
description: Sequentially access elements of a multi-dimensional spell matrix without exposing its underlying structure.
type: matlab
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  classdef MatrixIterator < handle
      properties
          Matrix
          CurrentIndex
      end
      methods
          function obj = MatrixIterator(mat)
              obj.Matrix = mat;
              obj.CurrentIndex = 1;
          end
          function val = next(obj)
              val = obj.Matrix(obj.CurrentIndex);
              obj.CurrentIndex = obj.CurrentIndex + 1;
          end
          function b = hasNext(obj)
              b = obj.CurrentIndex <= numel(obj.Matrix);
          end
      end
  end
tags: [iterator, traversal, matrices]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Iterator

Walk the path of the elements in linear time, ignorant of the hyperspatial folding that contains them.
