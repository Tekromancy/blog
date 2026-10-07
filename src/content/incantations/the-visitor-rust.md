---
title: Visitor of the Spectral Auditor
description: Represent an operation to be performed on the elements of an object structure.
type: rust
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Auditing"
formula: |2
  pub trait Visitor {
      fn visit_server(&self, server: &ServerNode);
      fn visit_terminal(&self, terminal: &TerminalNode);
  }

  pub trait Element { fn accept(&self, visitor: &dyn Visitor); }

  pub struct ServerNode { pub data_capacity: u32 }
  impl Element for ServerNode {
      fn accept(&self, visitor: &dyn Visitor) { visitor.visit_server(self); }
  }

  pub struct TerminalNode { pub active_users: u32 }
  impl Element for TerminalNode {
      fn accept(&self, visitor: &dyn Visitor) { visitor.visit_terminal(self); }
  }

  pub struct CapacityAuditor;
  impl Visitor for CapacityAuditor {
      fn visit_server(&self, server: &ServerNode) {
          println!("Auditing server capacity: {}", server.data_capacity);
      }
      fn visit_terminal(&self, terminal: &TerminalNode) {
          println!("Auditing terminal users: {}", terminal.active_users);
      }
  }
tags: [behavioral, visitor, divination, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Spectral Auditor floats through the corporate grid structure, inspecting nodes without ever altering their underlying data definitions. The Visitor pattern relies on the power of Double-Dispatch to achieve this.

By separating the algorithmic logic (the Auditor) from the elemental structure (the Grid Nodes), you can continuously invent new operations and diagnostics without forcing a recompilation or modification of the fundamental node traits.
