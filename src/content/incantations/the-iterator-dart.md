---
title: The Planeswalker
description: Traverse complex esoteric collections without exposing their underlying realities.
type: dart
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Conjuration // Teleportation"
formula: |2
  class GrimoireCollection implements Iterable<String> {
    final List<String> _tomes = ['Necronomicon', 'Book of Vile Darkness', 'Tome of Clear Thought'];

    @override
    Iterator<String> get iterator => _TomeIterator(this);

    // Boilerplate for Iterable omitted for arcane brevity
    @override get first => _tomes.first;
    @override get last => _tomes.last;
    @override get length => _tomes.length;
    @override get isEmpty => _tomes.isEmpty;
    @override get isNotEmpty => _tomes.isNotEmpty;
    // ...
    @override dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
  }

  class _TomeIterator implements Iterator<String> {
    final GrimoireCollection _collection;
    int _index = -1;

    _TomeIterator(this._collection);

    @override
    String get current => _collection._tomes[_index];

    @override
    bool moveNext() {
      if (_index < _collection._tomes.length - 1) {
        _index++;
        return true;
      }
      return false;
    }
  }

  void main() {
    final library = GrimoireCollection();
    for (var tome in library) {
      print('Dusting off: $tome');
    }
  }
tags: [dart, iterator, collections, planeswalking]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A true Planeswalker cares not if a realm is structured as an Array, a LinkedList, or a binary Tree of corrupted souls. The Iterator extracts the traversal logic, letting you step sequentially through mysterious data structures without ever knowing their dark secrets. Dart embeds this deeply via `Iterable`.
