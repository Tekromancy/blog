---
title: The Bridge (jq)
description: Decouple the abstraction of an entity from its underlying elemental implementation.
type: jq
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Ethereal Connection"
formula: |2
  # Implementations
  def render_html: "<div>" + .content + "</div>";
  def render_markdown: "**" + .content + "**";

  # Abstraction
  def notification($renderer):
    {
      "id": .id,
      "rendered_message": (.message | {content: .} | $renderer)
    };

  # Utilizing the Bridge
  .events[] | notification(render_markdown)
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Bridge** severs the bond between what an object represents and how its internals are executed. In the realm of `jq`, we pass filter functions as high-order arguments (the implementation) into the abstraction structure. This grants us the flexibility to swap rendering spells or processing protocols without mutating the core notification chassis.
