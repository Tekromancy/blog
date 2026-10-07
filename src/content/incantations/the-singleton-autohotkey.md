---
title: "The Monolith Spirit"
description: "Ensure that only one supreme automation entity controls the keyboard and mouse, preventing arcane interference."
type: autohotkey
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Domain Control"
formula: |2
  class SupremePoltergeist {
      static instance := ""
      
      static GetInstance() {
          if (SupremePoltergeist.instance == "") {
              SupremePoltergeist.instance := SupremePoltergeist()
          }
          return SupremePoltergeist.instance
      }
      
      __New() {
          if (SupremePoltergeist.instance != "") {
              throw Error("Only one Supreme Poltergeist can exist!")
          }
          this.hauntings := 0
      }
      
      RecordHaunting() {
          this.hauntings += 1
          return this.hauntings
      }
  }

  spirit1 := SupremePoltergeist.GetInstance()
  spirit2 := SupremePoltergeist.GetInstance()
  
  spirit1.RecordHaunting()
  MsgBox("Spirit 2 reads: " . spirit2.RecordHaunting()) ; 2
tags: [autohotkey, singleton, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
