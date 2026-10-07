---
title: The Abstract Factory in AWK
description: Conjure text factories dynamically to shape raw data streams into refined artifacts.
type: awk
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Form-Shaping"
formula: |2
  # The Abstract Factory weaves distinct grimoire formats
  function factory_html_begin() { return "<html><body><div class='scroll'>" }
  function factory_html_end() { return "</div></body></html>" }
  function factory_json_begin() { return "{ \"scroll\": [" }
  function factory_json_end() { return "] }" }
  
  # The Factory Selector - Channeling the chosen text realm
  function begin_doc(type) {
      if (type == "html") return factory_html_begin()
      if (type == "json") return factory_json_begin()
  }
  
  function end_doc(type) {
      if (type == "html") return factory_html_end()
      if (type == "json") return factory_json_end()
  }
  
  BEGIN { 
      format = "json"
      print "Opening the artifact..."
      print begin_doc(format) 
      print end_doc(format)
  }
tags: [awk, text-processing, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the ancient scriptoria of Unix, the Abstract Factory pattern empowers the Archmage to seamlessly switch between different output representations—from structured JSON scrolls to stylized HTML tomes—without altering the core incantation.
