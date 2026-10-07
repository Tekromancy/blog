---
title: "The Chain of Responsibility Sigil"
description: "Passing anomalous magical events along a series of arcane handlers."
type: v
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Flow Control"
formula: |2
  module main

  interface Handler {
  mut:
  	set_next(h Handler)
  	handle(request string)
  }

  @[heap]
  struct BaseHandler {
  mut:
  	next_handler ?Handler
  }
  fn (mut h BaseHandler) set_next(next Handler) {
  	h.next_handler = next
  }
  fn (mut h BaseHandler) handle(request string) {
  	if mut next := h.next_handler {
  		next.handle(request)
  	}
  }

  @[heap]
  struct FireWall {
  	BaseHandler
  }
  fn (mut h FireWall) handle(request string) {
  	if request == "fire" {
  		println("FireWall blocked the blazing payload.")
  	} else {
  		h.BaseHandler.handle(request)
  	}
  }

  @[heap]
  struct IceWall {
  	BaseHandler
  }
  fn (mut h IceWall) handle(request string) {
  	if request == "ice" {
  		println("IceWall shattered the frozen payload.")
  	} else {
  		h.BaseHandler.handle(request)
  	}
  }

  fn main() {
  	mut ice := IceWall{}
  	mut fire := FireWall{}
  	fire.set_next(ice)

  	println("Sending fire request:")
  	fire.handle("fire")

  	println("Sending ice request:")
  	fire.handle("ice")
  }
tags: [vlang, chain-of-responsibility, behavioral, middleware]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Chain of Responsibility Sigil

Incoming network curses must be filtered. The Chain of Responsibility links various elemental firewalls together. If one barrier cannot handle the curse, it passes the anomaly to the next node in the chain. Vlang's embedded structs (`BaseHandler`) make implementing shared chain logic elegant and low-overhead.
