---
title: Command
description: Encapsulate a request as an object, via CSS variables driven by inputs or state checkboxes.
type: css
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Triggered Directives"
formula: |2
  /* The command is encapsulated in a hidden checkbox */
  .hidden-trigger {
    display: none;
  }
  
  /* Executing the command triggers a state change in siblings */
  #toggle-invisibility:checked ~ .target-ward {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.9);
    transition: all 0.5s ease-out;
  }
tags: [css, checkbox-hack, state, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Also known as the "checkbox hack", the Command pattern stores user input state entirely within the DOM and CSS, firing off elaborate transitions and visibility toggles without a single script being executed.
