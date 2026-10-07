---
title: "The Spectral Proxy"
description: "Control access to a powerful poltergeist, delaying its full manifestation until the user crosses the threshold."
type: autohotkey
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Guardian Wards"
formula: |2
  class PoltergeistInterface {
      Unleash() {
          throw Error("Not implemented")
      }
  }

  class SupremePoltergeist extends PoltergeistInterface {
      Unleash() {
          Run("calc.exe")
          Sleep(500)
          Send("666")
      }
  }

  class GuardianProxy extends PoltergeistInterface {
      __New() {
          this.real_spirit := ""
      }
      Unleash() {
          if (this.real_spirit == "") {
              this.real_spirit := SupremePoltergeist()
          }
          ; Add warding logic here
          if (A_Hour > 22 || A_Hour < 5) {
              this.real_spirit.Unleash()
          } else {
              MsgBox("The spirits slumber.")
          }
      }
  }

  warded_spirit := GuardianProxy()
  warded_spirit.Unleash()
tags: [autohotkey, proxy, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
