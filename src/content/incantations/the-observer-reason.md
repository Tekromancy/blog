---
title: Observer in ReasonML
description: Reactive data streams and magical listeners.
type: reason
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Sensory"
formula: |2
  module Observable = {
    let listeners = ref([]);
    let subscribe = (cb) => listeners := [cb, ...listeners^];
    let notify = (data) => List.iter(cb => cb(data), listeners^);
  };
tags: [reason, observer, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Observer binds familiar imperative callbacks to a centralized registry, often handled seamlessly through React/ReasonReact primitives or RxJS hexes.
