---
title: The Bridge of Jsonnet
description: Decoupling an abstraction from its implementation.
type: jsonnet
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Astral Connection"
formula: |2
  local Theme = {
    color: "black",
    font: "arial"
  };

  local DarkTheme = Theme { color: "darkgrey" };
  local LightTheme = Theme { color: "white" };

  local UIElement(theme) = {
    theme: theme,
    render():: "Rendering element with color " + self.theme.color
  };

  {
    darkButton: UIElement(DarkTheme) + { type: "Button" },
    lightWindow: UIElement(LightTheme) + { type: "Window" }
  }
tags: [structural, bridge, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge separates the UI structure from its styling theme, allowing both to evolve independently in the ether of configuration.
