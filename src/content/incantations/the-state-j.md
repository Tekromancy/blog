---
title: "The State"
description: "An elemental familiar shifting its behavior when transitioning from water to ice."
type: j
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  coclass 'Familiar'
  create =: 3 : 'state =: ''Water'''
  
  freeze =: 3 : 'state =: ''Ice'''
  melt =: 3 : 'state =: ''Water'''
  
  attack =: 3 : 0
    if. state -: 'Water' do. 'Splash!'
    elseif. state -: 'Ice' do. 'Pierce!'
    end.
  )
tags: [state, transitions, behavior, familiar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The familiar changes its core output based on an internal mutable state value.
