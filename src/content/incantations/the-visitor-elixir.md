---
title: Visitor
description: Separate complex diagnostic operations from the data structures they operate on.
type: elixir
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Deep-Scan"
formula: |2
  defmodule Tekromancy.AstNode do
    defstruct [:type, :value, :children]
  end

  defmodule Tekromancy.ScannerVisitor do
    def visit(%Tekromancy.AstNode{type: :corrupted} = node) do
      IO.puts("Purging corruption at node: #{node.value}")
      %{node | value: :purged}
    end

    def visit(%Tekromancy.AstNode{type: :clean} = node) do
      node
    end

    def traverse(nodes, visitor_fn) when is_list(nodes) do
      Enum.map(nodes, fn node ->
        node
        |> visitor_fn.()
        |> Map.update!(:children, &traverse(&1, visitor_fn))
      end)
    end
    def traverse(nil, _), do: []
  end
tags: [elixir, behavioral, visitor, recursion, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When inspecting the deep neuro-mesh of a collapsed Hive, you must avoid injecting diagnostic code directly into the structural definitions. The Visitor pattern, implemented via recursive traversal functions, walks the AST. It applies a `visitor_fn` (a pure function) to each node, mapping corruption away without side effects.
