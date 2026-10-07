---
title: "The Ghostly Visitor"
description: "Send an arcane inspector through your legion of automation windows, extracting metrics or altering states without touching their original code."
type: autohotkey
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Spectral Inspection"
formula: |2
  class WindowElement {
      Accept(visitor) {
          throw Error("Not implemented")
      }
  }

  class NotepadElement extends WindowElement {
      Accept(visitor) {
          visitor.VisitNotepad(this)
      }
  }

  class CalcElement extends WindowElement {
      Accept(visitor) {
          visitor.VisitCalc(this)
      }
  }

  class PoltergeistVisitor {
      VisitNotepad(element) {
          ToolTip("Ghost writes in Notepad!")
          Sleep(500)
          ToolTip()
      }
      VisitCalc(element) {
          ToolTip("Ghost calculates doom in Calc!")
          Sleep(500)
          ToolTip()
      }
  }

  elements := [NotepadElement(), CalcElement()]
  inspector := PoltergeistVisitor()
  
  for index, el in elements {
      el.Accept(inspector)
  }
tags: [autohotkey, visitor, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
