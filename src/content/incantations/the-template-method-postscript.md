---
title: "Template Method in PostScript"
description: "Define the skeleton of a page rendering algorithm, letting specific tomes override the hooks."
type: postscript
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Skeletal Algorithm"
formula: |2
  % Template Method in PostScript
  /PageTemplate <<
    /drawHeader { (Default Header\n) print }
    /drawFooter { (Default Footer\n) print }
    /render { 
      dup /drawHeader get exec 
      (Rendering Core Content...\n) print
      dup /drawFooter get exec 
    }
  >> def
  
  /CustomPage PageTemplate dup maxlength dict copy def
  CustomPage /drawHeader { (Arcane Custom Header\n) print } put
  
  CustomPage /render get exec
tags: [postscript, print-daemon, behavioral, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Template Method: The Skeletal Render

Certain processes follow a strict lifecycle—such as initializing a matrix, drawing headers, processing content, and stamping footers. The Template Method dictates this unchangeable skeleton in a base dictionary while providing overridable hooks. Sub-dictionaries can mutate the headers without corrupting the sacred order of operations.
