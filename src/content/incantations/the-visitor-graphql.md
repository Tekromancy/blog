---
title: The Astral Visitor
description: Representing an operation to be performed on the elements of an object structure.
type: graphql
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Evocation // Astral Projection"
formula: |2
  # The Nodes to be visited
  union NodeElement = TextNode | ImageNode | VideoNode

  type TextNode { content: String! }
  type ImageNode { url: String! }
  type VideoNode { streamUrl: String! }

  # The generic response of visiting the structure
  type VisitedDocument {
    totalWords: Int!
    totalMediaSize: Int!
    summary: String!
  }

  type Query {
    # The resolver acts as the Visitor, traversing the underlying
    # heterogeneous elements and accumulating a result.
    analyzeGrimoire(id: ID!): VisitedDocument!
  }
tags: [graphql, behavioral, visitor, unions, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In a GraphQL ecosystem, the Visitor pattern is often employed on the server side (traversing the AST for validation or query complexity analysis). However, from a schema perspective, a field that takes a heterogeneous tree (like a document of mixed nodes) and returns an aggregated analysis represents a Visitor operating over those elements.
