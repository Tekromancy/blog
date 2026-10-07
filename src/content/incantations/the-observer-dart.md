---
title: The Scrying Orb
description: Define a one-to-many dependency so that when a magical source shifts, all bound familiars are notified.
type: dart
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  import 'dart:async';

  class Oracle {
    // Dart's StreamController is the ultimate Observer pattern implementation
    final _prophecyController = StreamController<String>.broadcast();

    Stream<String> get prophecies => _prophecyController.stream;

    void seeFuture(String vision) {
      print('Oracle sees: $vision');
      _prophecyController.add(vision);
    }

    void close() => _prophecyController.close();
  }

  void main() {
    final oracle = Oracle();

    // Observers subscribe to the stream
    oracle.prophecies.listen((vision) {
      print('Cultist A interprets: $vision means doom!');
    });

    oracle.prophecies.listen((vision) {
      print('Cultist B prepares for: $vision');
    });

    oracle.seeFuture('A blood-red moon rises.');
  }
tags: [dart, observer, streams, reactive, divination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Why poll the ether for answers when the universe can whisper directly to your mind? The Observer pattern is Dart's bread and butter, natively enshrined as Streams and `ChangeNotifier`. When the Oracle's Scrying Orb shifts, the event propagates asynchronously to all bonded listeners.
