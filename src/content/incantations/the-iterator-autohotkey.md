---
title: "The Ghostly Iterator"
description: "Traverse a swarm of poltergeist targets sequentially without exposing the underlying ethereal collections."
type: autohotkey
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Target Traversal"
formula: |2
  class TargetIterator {
      __New(collection) {
          this.collection := collection
          this.index := 1
      }
      HasNext() {
          return this.index <= this.collection.Length
      }
      Next() {
          if (this.HasNext()) {
              val := this.collection[this.index]
              this.index += 1
              return val
          }
          return ""
      }
  }

  class TargetSwarm {
      __New() {
          this.targets := []
      }
      Add(target) {
          this.targets.Push(target)
      }
      GetIterator() {
          return TargetIterator(this.targets)
      }
  }

  swarm := TargetSwarm()
  swarm.Add("ahk_exe notepad.exe")
  swarm.Add("ahk_exe calc.exe")

  iterator := swarm.GetIterator()
  while iterator.HasNext() {
      target := iterator.Next()
      if WinExist(target) {
          WinActivate(target)
          Sleep(200)
      }
  }
tags: [autohotkey, iterator, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
