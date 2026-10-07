---
title: The Proxy Incantation
description: Guarding access to sensitive or expensive execution flows in Piet.
type: piet
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Chromatic Sorcery"
formula: |2
  // Piet proxy representation:
  // - Real Subject: A resource-intensive loop or complex calculation block.
  // - Proxy: A lightweight conditional branch (pointer operation).
  // - Check: Evaluating the top of the stack. If zero, bypass the Real Subject.
  // - Protection: Shielding the expensive block from unwarranted execution.
tags: [structural, proxy, piet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy stands as a sentinel before the true power of a spell. It is a lightweight gatekeeper, composed of simple pointer and conditional operations, assessing the stack's state to determine if the heavy execution block beyond is truly needed.
