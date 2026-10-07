---
title: "The Flyweight: Matrix Extrinsic Factoring"
description: "Reduce memory and parsing overhead by sharing common structural definitions across vast arrays of wards."
type: cue
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Factoring"
formula: |2
  package wards
  
  // Intrinsic State (The Flyweight): Shared data
  // These are heavy matrices that we don't want to redefine or copy fully.
  #CoreMatrices: {
  	alpha: { matrix_id: "A1", signature: "0xDEADBEEF", complexity: 9000 }
  	beta:  { matrix_id: "B2", signature: "0xCAFEBABE", complexity: 8500 }
  }
  
  // Extrinsic State: The unique data for each instance
  #DeployedWard: {
  	// The unique identifier for this specific deployment
  	node_name: string
  	
  	// Reference to the shared flyweight state
  	// We use an alias to avoid duplicating the data structurally everywhere
  	matrix_ref: "alpha" | "beta"
  	
  	// Validation to ensure the ref exists, without duplicating it into the output
  	_matrix_data: #CoreMatrices[matrix_ref]
  }
  
  // Usage: Deploying thousands of wards without data bloat
  deployments: {
  	"gate-1": #DeployedWard & { node_name: "gate-1", matrix_ref: "alpha" }
  	"gate-2": #DeployedWard & { node_name: "gate-2", matrix_ref: "alpha" }
  	"gate-3": #DeployedWard & { node_name: "gate-3", matrix_ref: "beta" }
  }
tags: [flyweight, structural, cue, factoring, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In a massive cyber-astral deployment, you might invoke thousands of **Lattice Data Validation Wards**. If every ward instance embeds a complete copy of a complex `signature` or `matrix` definition, the CUE evaluation graph bloats massively, slowing down validation.

The **Flyweight** pattern solves this by segregating intrinsic, heavy data into a centralized dictionary (`#CoreMatrices`). The individual ward configurations (`#DeployedWard`) store only their unique extrinsic state and a lightweight reference string (`matrix_ref`). Using hidden fields (`_matrix_data`), CUE can validate the reference against the shared dictionary without actually injecting the heavy data into every deployed instance's final output, keeping the unified configuration lean and fast.
