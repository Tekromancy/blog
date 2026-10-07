---
title: "Composite: The Fractal Ward"
description: "Compose runes into tree structures to represent part-whole hierarchies."
type: rpg
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds RuneNode_t Qualified Template;
    Name Char(20);
    ChildCount Int(10);
    Children Pointer Dim(10); // Array of pointers to other nodes
  End-Ds;

  Dcl-Proc ProcessNode Export;
    Dcl-Pi *N;
      pNode Pointer Value;
    End-Pi;

    Dcl-Ds Node Likeds(RuneNode_t) Based(pNode);
    Dcl-S i Int(10);

    // Process current node
    Dsply Node.Name;

    // Recursively process children
    For i = 1 to Node.ChildCount;
       ProcessNode(Node.Children(i));
    EndFor;
  End-Proc;
tags: [structural, ibm-i, runes, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Composite

Tree structures are native to IFS filesystems and hierarchical menus in IBM i. The Composite pattern allows individual Runes and collections of Runes to be handled uniformly.
