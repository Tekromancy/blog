---
title: The Blind Iterator
description: Traversing the labyrinthine collections of the Cathedral without uncovering their underlying structure.
type: java
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  import java.util.NoSuchElementException;

  public interface ReliquaryIterator {
      boolean hasNext();
      String next();
  }

  public class ArrayReliquary {
      private final String[] relics;

      public ArrayReliquary(String[] relics) {
          this.relics = relics;
      }

      public ReliquaryIterator createIterator() {
          return new ReliquaryIteratorImpl();
      }

      private class ReliquaryIteratorImpl implements ReliquaryIterator {
          private int index = 0;

          @Override
          public boolean hasNext() {
              return index < relics.length;
          }

          @Override
          public String next() {
              if (!hasNext()) {
                  throw new NoSuchElementException("The reliquary is empty.");
              }
              return relics[index++];
          }
      }
  }
tags: [iterator, traversal, collections, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The vaults of the Java Cathedral hold collections of unimaginable complexity. Exposing the bare arrays, trees, or graphs that house these artifacts is an architectural sin. The **Iterator** pattern binds the traversal logic into a separate, standardized construct.

By calling `createIterator()`, an adept is given a blind guide—a `ReliquaryIterator`. The caller simply invokes `hasNext()` and `next()`, completely oblivious to whether the underlying data is stored in a contiguous block of memory or scattered across a distributed cluster. It is the ultimate decoupling of traversal from structure.
